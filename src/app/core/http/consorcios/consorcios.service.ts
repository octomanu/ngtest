import { Injectable } from '@angular/core';
import { TableLambeServiceInterface } from 'app/interfaces/local/table-lambe-service.interface';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { Observable, throwError } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ConsorciosService implements TableLambeServiceInterface {
  url = `${environment.OCTO_API}/consorcios`;

  constructor(private http: HttpClient) {}

  paginate(
    paginatorParams: PaginatorParamsInterface,
    filtros: {},
  ): Observable<{}> {
    let params = new HttpParams();

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
    return this.http.get(`${this.url}`, { params }).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  searchByDisplay(display: string) {
    const URL = `${this.url}/buscar`;
    let params = new HttpParams();
    params = params.append('display', display);
    return this.http.get(URL, { params }).pipe(
      map((resp: any) => resp.data),
      catchError(err => throwError(err)),
    );
  }

  delete(id: number) {
    const URL = `${this.url}/${id}`;

    return this.http.delete(URL).pipe(
      map(resp => resp),
      catchError(err => throwError(err)),
    );
  }

  create(proveedor: Proveedor) {
    const URL = `${this.url}`;

    return this.http.post(URL, proveedor).pipe(
      map(resp => resp),
      catchError(err => throwError(err)),
    );
  }

  update(id: number, proveedor: Proveedor) {
    const URL = `${this.url}/${id}`;

    return this.http.put(URL, proveedor).pipe(
      map(resp => resp),
      catchError(err => throwError(err)),
    );
  }

  find(id: number) {
    const URL = `${this.url}/${id}`;

    return this.http.get(URL).pipe(
      map(resp => resp),
      catchError(err => throwError(err)),
    );
  }
}
