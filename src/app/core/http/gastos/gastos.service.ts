import { Injectable } from '@angular/core';
import { CrudService } from '../crud-service.class';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError, first, switchMap, mergeMap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { paginatorRequestParams } from 'redux/gastos/page/page.selectors';

@Injectable({
  providedIn: 'root',
})
export class GastosService extends CrudService {
  constructor(http: HttpClient, private store: Store<AppState>) {
    super(http);
  }

  paginate(): Observable<{}> {
    const url = `${environment.OCTO_API}/${this.getPath()}`;
    return this.store.select(paginatorRequestParams).pipe(
      first(),
      map(requestParams => {
        let params = new HttpParams();
        for (const key in requestParams) {
          if (requestParams[key]) {
            params = params.append(key, requestParams[key]);
          }
        }
        return params;
      }),
      switchMap(params => this.http.get(url, { params })),
    );
  }

  getPath() {
    return 'gastos';
  }

  updateMontoFecha(id: number, data) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/editarGrilla/${id}`;

    return this.http.put(URL, data).pipe(
      map(resp => resp),
      catchError(err => throwError(err)),
    );
  }

  findObs(id$: Observable<number>) {
    return id$.pipe(
      first(),
      map(id => `${environment.OCTO_API}/${this.getPath()}/mostrar/${id}`),
      mergeMap(url =>
        this.http.get(url).pipe(
          map((resp: any) => {
            if (resp.data) {
              return resp.data;
            }
            return resp;
          }),
        ),
      ),
    );
  }

  findPrevious(params: {
    id_proveedor: string;
    id_consorcio: string;
    id_servicio: string;
  }) {
    let httpParams = new HttpParams();

    httpParams = httpParams
      .append('id_proveedor', params.id_proveedor)
      .append('id_consorcio', params.id_consorcio)
      .append('gasto', params.id_servicio);
    const URL = `${environment.OCTO_API}/${this.getPath()}/buscarAnterior`;
    return this.http.get(`${URL}`, { params }).pipe(
      map((resp: any) => {
        return resp.data;
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }
}
