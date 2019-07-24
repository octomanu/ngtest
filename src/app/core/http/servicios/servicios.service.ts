import { Injectable } from '@angular/core';
import { CrudService } from '../crud-service.class';
import { environment } from '@env/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { LoadServiciosAction } from 'redux/servicios/servicios.actions';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService extends CrudService {
  constructor(http: HttpClient, protected store: Store<AppState>) {
    super(http);
  }

  paginate(
    paginatorParams: PaginatorParamsInterface,
    filtros: {},
  ): Observable<{}> {
    let params = new HttpParams();
    const url = `${environment.OCTO_API}/${this.getPath()}`;
    for (const key in filtros) {
      if (filtros[key] !== null) {
        params = params.append(key, filtros[key]);
      }
    }

    for (const key in paginatorParams) {
      if (paginatorParams[key] !== null) {
        params = params.append(key, paginatorParams[key]);
      }
    }
    return this.http.get(`${url}`, { params }).pipe(
      map((resp: any) => {
        this.store.dispatch(new LoadServiciosAction(resp.data));
        return resp;
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  getPath() {
    return 'servicios';
  }

  searchByDisplay(display: string) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/buscar`;
    let params = new HttpParams();
    params = params.append('display', display);
    return this.http.get(URL, { params }).pipe(
      map((resp: any) => {
        return resp.data;
      }),
      catchError(err => throwError(err)),
    );
  }
}
