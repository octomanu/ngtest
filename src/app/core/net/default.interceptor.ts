import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
  HttpResponseBase,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { LoginService } from '@core/http/login.service.ts/login.service';
import { BackendErrorMessageBuilderService } from '@core/i18n/backend-error-message-builder.service';

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
  private untouchedRequest;
  constructor(
    private injector: Injector,
    private loginService: LoginService,
    private backendMessage: BackendErrorMessageBuilderService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  get msg(): NzMessageService {
    return this.injector.get(NzMessageService);
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private checkStatus(ev: HttpResponseBase) {
    if (ev.status >= 200 && ev.status < 300) return;
    //los bad Request y entidades unprocesables los manejo en la app diferente
    if (ev.status == 400 || ev.status == 422) return;

    const errortext = CODEMESSAGE[ev.status] || ev.statusText;
    this.injector
      .get(NzNotificationService)
      .error(`Error de solicitud ${ev.status}: ${ev.url}`, errortext);
  }

  private handleData(
    ev: HttpResponseBase,
    untouchedRequest: HttpRequest<any>,
    httpHandler: HttpHandler,
  ): Observable<any> {
    // Puede ser porque `throw` La exportación no puede ser ejecutada `_HttpClient` De `end()` Operación
    if (ev.status > 0) {
      this.injector.get(_HttpClient).end();
    }

    this.checkStatus(ev);
    // Procesamiento de negocios: algunas operaciones generales
    switch (ev.status) {
      case 200:
        break;
      case 401: // 未登录状态码
        // 请求错误 401: https://preview.pro.ant.design/api/401 用户没有权限（令牌、用户名、密码错误）。
        (this.injector.get(DA_SERVICE_TOKEN) as ITokenService).clear();
        this.goTo('/passport/login');
        break;
      case 403:
      case 400:
        if (ev instanceof HttpErrorResponse) {
          if (ev.error.error == 'token.expired') {
            return this.loginService.renovarToken().pipe(
              mergeMap(data => {
                this.tokenService.set({ token: data.token });
                const authReq = untouchedRequest.clone({
                  setHeaders: { token: data.token },
                });

                const newDataRq = httpHandler.handle(authReq).pipe(
                  mergeMap(data => {
                    return of(data);
                  }),
                );
                return newDataRq;
              }),
            );
          } else {
            console.log('UPS NO ES ERRO TOKEN');
            this.backendMessage.buildMessage(ev.error.error);
            return throwError(ev);
          }
        }
        break;
      case 404:
        break;
      case 500:
        console.log(ev);
        this.goTo(`/exception/${ev.status}`);
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          console.warn(
            'No sé el error, la mayoría de ellos se debe a que el backend no admite CORS o una configuración no válida.',
            ev,
          );
          return throwError(ev);
        }
        break;
    }
    return of(ev);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Prefijo de servidor unificado plus
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = environment.SERVER_URL + url;
    }

    const newReq = req.clone({ url });
    const untouchedRequest = req.clone({ url });

    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // Permitir el manejo unificado de errores de solicitud

        if (event instanceof HttpResponseBase)
          return this.handleData(event, untouchedRequest, next);
        // Si todo está bien, seguimiento.
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => {
        return this.handleData(err, untouchedRequest, next);
      }),
    );
  }
}
