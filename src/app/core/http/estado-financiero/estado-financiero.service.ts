import { Injectable } from '@angular/core';

import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { Observable, throwError } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class EstadoFinancieroService {
  protected source: string;
  protected id: string;
  constructor(protected http: HttpClient) {}

  setSource(source) {
    this.source = source;
  }

  setId(id) {
    this.id = id;
  }

  getPath() {
    if (!this.source || !this.id) {
      console.log(this.source, this.id);
      throw new Error('No hay source/id seteado.');
    }
    return `estado-financiero/${this.source}/${this.id}`;
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
        return resp;
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }
}
