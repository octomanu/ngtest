import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable, throwError } from 'rxjs';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { CrudService } from '../crud-service.class';
import { environment } from '@env/environment';
import { map, catchError, first, switchMap } from 'rxjs/operators';
import { paginatorRequestParams } from 'redux/gastos-descripciones/gastos-descripciones.selectors';

@Injectable({
  providedIn: 'root',
})
export class GastosDescripcionesService extends CrudService
  implements OnDestroy {
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

  searchByDisplay(display: string) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/buscar`;
    let params = new HttpParams();
    params = params.append('display', display);
    return this.http.get(URL, { params }).pipe(
      map((resp: any) => resp.data),
      catchError(err => throwError(err)),
    );
  }

  getPath() {
    return 'gastos-descripciones';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
