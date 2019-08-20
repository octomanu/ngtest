import { Injectable, OnDestroy } from '@angular/core';
import { CrudService } from '../crud-service.class';
import { Subscription, Observable } from 'rxjs';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { CuentaCorrienteConsorcioState } from 'redux/cuenta-corriente-consorcio/cuenta-corriente-consorcio.reducer';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CuentaCorrienteConsorcioService extends CrudService
  implements OnDestroy {
  subscription: Subscription;
  filtros: any;
  parametros: PaginatorParamsInterface;

  constructor(http: HttpClient, public store: Store<AppState>) {
    super(http);
    this.subscription = this.store
      .select('cuentaCorrienteConsorcio')
      .subscribe((state: CuentaCorrienteConsorcioState) => {
        this.filtros = state.filtros;
        this.parametros = state.paginator.parametros;
        this.filtros.id_consorcio = state.id_consorcio;
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
    return 'cuenta-corriente-consorcio';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
