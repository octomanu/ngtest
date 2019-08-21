import { Injectable, OnDestroy } from '@angular/core';
import { CrudService } from '../crud-service.class';
import { Subscription, Observable, throwError } from 'rxjs';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { CuentaCorrienteUfState } from 'redux/cuenta-corriente-uf/cuenta-corriente-uf-reducer';
import { environment } from '@env/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CuentaCorrienteUfService extends CrudService implements OnDestroy {
  subscription: Subscription;
  filtros: any;
  parametros: PaginatorParamsInterface;

  constructor(http: HttpClient, public store: Store<AppState>) {
    super(http);
    this.subscription = this.store
      .select('cuentaCorrienteUf')
      .subscribe((state: CuentaCorrienteUfState) => {
        this.filtros = state.filtros;
        this.parametros = state.paginator.parametros;
        this.filtros.id_consorcio = state.id_consorcio;
        this.filtros.id_uf = state.id_uf;
      });
  }

  paginate(): Observable<{}> {
    const url = `${environment.OCTO_API}/${this.getPath()}`;
    const params = this.getPaginatorParams();
    return this.http.get(url, { params });
  }

  getPaginatorParams(): HttpParams {
    let params = new HttpParams();
    for (const key in this.filtros) {
      if (this.filtros[key]) {
        params = params.append(key, this.filtros[key]);
      }
    }

    // tslint:disable-next-line: forin
    for (const key in this.parametros) {
      params = params.append(key, this.parametros[key]);
    }
    return params;
  }

  crearCobro(data) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/cobro/${this.filtros.id_uf}`;

    return this.http.post(URL, data).pipe(
      map(resp => resp),
      catchError(err => throwError(err)),
    );
  }

  crearDeuda(data) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/deuda/${this.filtros.id_uf}`;

    return this.http.post(URL, data).pipe(
      map(resp => resp),
      catchError(err => throwError(err)),
    );
  }

  getPath() {
    return 'cuenta-corriente-uf';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
