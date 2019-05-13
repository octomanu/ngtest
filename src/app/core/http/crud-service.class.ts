import { ServicePathGetter } from './service-path-getter.interface';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { Observable, throwError } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { map, catchError } from 'rxjs/operators';

export abstract class CrudService implements ServicePathGetter {
  protected url: string;

  constructor(protected http: HttpClient) {
    this.url = `${environment.OCTO_API}/${this.getPath()}`;
  }

  getPath() {
    throw new Error('Method getPath of CrudService not implemented.');
    return '';
  }

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
    const URL = `${this.url}/mostrar/${id}`;

    return this.http.get(URL).pipe(
      map(resp => resp),
      catchError(err => throwError(err)),
    );
  }
}
