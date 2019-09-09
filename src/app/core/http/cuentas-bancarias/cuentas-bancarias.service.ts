import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '@env/environment.prod';
import { CrudService } from '../crud-service.class';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { CuentasBancariasState } from 'redux/cuentas-bancarias/cuentas-bancarias.reducer';
import { selectCuentaBancaria } from 'redux/cuentas-bancarias/cuentas-bancarias.selectors';

@Injectable({
  providedIn: 'root',
})
export class CuentasBancariasService extends CrudService implements OnDestroy {
  subscription: Subscription;
  filtros: any;
  parametros: PaginatorParamsInterface;

  constructor(http: HttpClient, public store: Store<AppState>) {
    super(http);
    this.subscription = this.store
      .select(selectCuentaBancaria)
      .subscribe((state: CuentasBancariasState) => {
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

  getPath() {
    return 'cuentas-bancarias';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
