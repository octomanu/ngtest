import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent, HttpResponseBase } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

const CODEMESSAGE = {
  200: 'El servidor devolvió con éxito los datos solicitados.',
  201: 'Los datos nuevos o modificados son exitosos.',
  202: 'Una solicitud ha entrado en la cola de fondo (tarea asíncrona).',
  204: 'Los datos fueron eliminados con éxito.',
  400: 'La solicitud se realizó con un error y el servidor no realizó ninguna operación para crear o modificar datos.',
  401: 'El usuario no tiene permiso (token, nombre de usuario, contraseña es incorrecta).',
  403: 'El usuario está autorizado, pero el acceso está prohibido.',
  404: 'La solicitud se realiza para un registro que no existe y el servidor no funciona.',
  406: 'El formato de la solicitud no está disponible.',
  410: 'El recurso solicitado se elimina permanentemente y no se recuperará.',
  422: 'Se produjo un error de validación al crear un objeto.',
  500: 'Se ha producido un error en el servidor. Verifique el servidor.',
  502: 'Error de puerta de enlace.',
  503: 'El servicio no está disponible y el servidor está sobrecargado o mantenido temporalmente.',
  504: 'La puerta de enlace expiró.',
};

/**
 * El interceptor HTTP predeterminado, ver los detalles de registro `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) { 
  }

  get msg(): NzMessageService {
    return this.injector.get(NzMessageService);
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private checkStatus(ev: HttpResponseBase) {
    if (ev.status >= 200 && ev.status < 300) return;

    const errortext = CODEMESSAGE[ev.status] || ev.statusText;
    this.injector.get(NzNotificationService).error(
      `Error de solicitud ${ev.status}: ${ev.url}`,
      errortext
    );
  }

  private handleData(ev: HttpResponseBase): Observable<any> {
    // Puede ser porque `throw` La exportación no puede ser ejecutada `_HttpClient` De `end()` Operación
    if (ev.status > 0) {
      this.injector.get(_HttpClient).end();
    }
    this.checkStatus(ev);
    // Procesamiento de negocios: algunas operaciones generales
    switch (ev.status) {
      case 200:
        // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
        // 例如响应内容：
        //  错误内容：{ status: 1, msg: '非法参数' }
        //  正确内容：{ status: 0, response: {  } }
        // 则以下代码片断可直接适用
        // if (event instanceof HttpResponse) {
        //     const body: any = event.body;
        //     if (body && body.status !== 0) {
        //         this.msg.error(body.msg);
        //         // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
        //         // this.http.get('/').subscribe() 并不会触发
        //         return throwError({});
        //     } else {
        //         // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码
        //         return of(new HttpResponse(Object.assign(event, { body: body.response })));
        //         // 或者依然保持完整的格式
        //         return of(event);
        //     }
        // }
        break;
      case 401: // 未登录状态码
        // 请求错误 401: https://preview.pro.ant.design/api/401 用户没有权限（令牌、用户名、密码错误）。
        (this.injector.get(DA_SERVICE_TOKEN) as ITokenService).clear();
        this.goTo('/passport/login');
        break;
      case 403:
      case 400:
      case 404:
      break;
      case 500:
        this.goTo(`/exception/${ev.status}`);
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          if(ev.error.ok == 'false'){
            return of(ev);
          }
          console.warn('No sé el error, la mayoría de ellos se debe a que el backend no admite CORS o una configuración no válida.', ev);
          return throwError(ev);
        }
        break;
    }
    return of(ev);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 统一加上服务端前缀
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = environment.SERVER_URL + url;
    }

    const newReq = req.clone({ url });
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // Permitir el manejo unificado de errores de solicitud
        if (event instanceof HttpResponseBase)
          return this.handleData(event);
        // Si todo está bien, seguimiento.
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err)),
    );
  }
}
