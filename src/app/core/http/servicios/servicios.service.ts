import { Injectable } from '@angular/core';
import { CrudService } from '../crud-service.class';
import { environment } from '@env/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { throwError, Observable, Subscription } from 'rxjs';
import { catchError, map, first, switchMap } from 'rxjs/operators';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { paginatorRequestParams } from 'redux/servicios/servicios.selectors';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService extends CrudService {
  subscription: Subscription;
  filtros: any;
  parametros: PaginatorParamsInterface;

  constructor(http: HttpClient, public store: Store<AppState>) {
    super(http);
  }

  paginate(): Observable<{}> {
    const url = `${environment.OCTO_API}/${this.getPath()}`;
    return this.store.select(paginatorRequestParams).pipe(
      first(),
      map(pagiantorParams => {
        let params = new HttpParams();
        for (const key in pagiantorParams) {
          if (pagiantorParams[key]) {
            params = params.append(key, pagiantorParams[key]);
          }
        }
        return params;
      }),
      switchMap(params => this.http.get(url, { params })),
    );
  }

  getPath() {
    return 'servicios';
  }

  searchByDisplay(display: string, id?: string) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/buscar`;
    let params = new HttpParams();
    params = params.append('display', display);
    params = id ? params.append('id', id) : params;
    return this.http.get(URL, { params }).pipe(
      map((resp: any) => {
        return resp.data;
      }),
      catchError(err => throwError(err)),
    );
  }
}
