import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GastosCuotasService {
  constructor(protected http: HttpClient) {}

  pagarCuota(idCuota: number, data: any) {
    const url = `${environment.OCTO_API}/gastos-cuotas/pagar-cuota/${idCuota}`;
    return this.http.post(url, data);
  }

  paginate(
    paginatorParams: PaginatorParamsInterface,
    filtros: {},
  ): Observable<{}> {
    let params = new HttpParams();
    const url = `${environment.OCTO_API}/gastos-cuotas`;
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
