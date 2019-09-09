import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable, throwError } from 'rxjs';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { CrudService } from '../crud-service.class';
import { GastosDescripcionesState } from 'redux/gastos-descripciones/gastos-descripciones.reducer';
import { environment } from '@env/environment';
import { map, catchError } from 'rxjs/operators';

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
    this.subscription = this.store
      .select('gastosDescripciones')
      .subscribe((state: GastosDescripcionesState) => {
        this.filtros = state.filtros;
        this.parametros = state.paginator.parametros;
      });
  }

  paginate(): Observable<{}> {
    let params = new HttpParams();
    const url = `${environment.OCTO_API}/${this.getPath()}`;
    for (const key in this.filtros) {
      if (this.filtros[key]) {
        params = params.append(key, this.filtros[key]);
      }
    }

    // tslint:disable-next-line: forin
    for (const key in this.parametros) {
      params = params.append(key, this.parametros[key]);
    }
    return this.http.get(url, { params });
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
