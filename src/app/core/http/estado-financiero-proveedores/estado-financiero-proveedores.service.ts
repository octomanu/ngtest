import { Injectable } from '@angular/core';

import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { Observable, throwError } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '@env/environment.prod';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EstadoFinancieroProveedoresService {
  constructor(protected http: HttpClient) {}

  paginate(
    paginatorParams: PaginatorParamsInterface,
    filtros: {},
  ): Observable<{}> {
    let params = new HttpParams();
    const url = `${environment.OCTO_API}/estado-financiero-proveedores`;
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
}
