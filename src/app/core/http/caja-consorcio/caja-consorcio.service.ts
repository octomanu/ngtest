import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../crud-service.class';
import { Subscription, Observable, throwError } from 'rxjs';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { CajaConsorcioState } from 'redux/caja-consorcio/caja-consorcio.reducer';
import { environment } from '@env/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CajaConsorcioService extends CrudService implements OnDestroy {
  subscription: Subscription;
  filtros: any;
  parametros: PaginatorParamsInterface;

  constructor(http: HttpClient, public store: Store<AppState>) {
    super(http);
    this.subscription = this.store
      .select('cajaConsorcioState')
      .subscribe((state: CajaConsorcioState) => {
        this.filtros = state.filtros;
        this.parametros = state.paginator.parametros;
      });
  }

  createIngreso(data) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/ingreso`;
    return this.http.post(URL, data).pipe(
      map(resp => resp),
      catchError(err => throwError(err)),
    );
  }

  createEgreso(data) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/egreso`;
    return this.http.post(URL, data).pipe(
      map(resp => resp),
      catchError(err => throwError(err)),
    );
  }

  saldos() {
    let params = new HttpParams();
    const url = `${environment.OCTO_API}/${this.getPath()}/saldos`;
    if (this.filtros['id_consorcio'].length > 0) {
      params = params.append('consorcios', this.filtros['id_consorcio']);
    }
    return this.http.get(url, { params });
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

  getPath() {
    return 'caja-consorcios';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
