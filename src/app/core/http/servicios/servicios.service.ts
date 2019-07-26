import { Injectable, OnInit } from '@angular/core';
import { CrudService } from '../crud-service.class';
import { environment } from '@env/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { throwError, Observable, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { Store, select, createSelector } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import * as fromServicios from 'redux/servicios/servicios.reducer';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService extends CrudService {
  subscription: Subscription;
  filtros: any;
  parametros: PaginatorParamsInterface;
  serviciosState = createSelector(
    (state: AppState) => state.serviciosState,
    (state: fromServicios.ServiciosState) => state.filtros,
  );

  constructor(http: HttpClient, public store: Store<AppState>) {
    super(http);
    this.subscription = this.store
      .select('serviciosState')
      .subscribe((state: fromServicios.ServiciosState) => {
        this.filtros = state.paginator.filtros;
        this.parametros = state.paginator.parametros;
      });
  }

  paginateRedux(): Observable<{}> {
    let params = new HttpParams();
    const url = `${environment.OCTO_API}/${this.getPath()}`;
    // tslint:disable-next-line: forin
    for (const key in this.filtros) {
      params = params.append(key, this.filtros[key]);
    }

    // tslint:disable-next-line: forin
    for (const key in this.parametros) {
      params = params.append(key, this.parametros[key]);
    }
    return this.http.get(url, { params });
  }

  paginate(
    paginatorParams: PaginatorParamsInterface,
    filtros: {},
  ): Observable<{}> {
    console.log(this.filtros);
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
