import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { map, catchError, mergeMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GastosCuotasService {
  constructor(protected http: HttpClient) {}

  pagarCuota(id$: Observable<number>, data: any) {
    return id$.pipe(
      first(),
      map(id => `${environment.OCTO_API}/gastos-cuotas/pagar-cuota/${id}`),
      mergeMap(url => this.http.post(url, data)),
    );
  }

  findObs(id$: Observable<number>) {
    return id$.pipe(
      first(),
      map(id => `${environment.OCTO_API}/gastos-cuotas/pagar-cuota/${id}`),
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

  massiveEdit(data) {
    const url = `${environment.OCTO_API}/gastos-cuotas/tableUpdate`;
    return this.http.post(url, { dues: data });
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
