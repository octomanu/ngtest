import { Injectable, OnDestroy } from '@angular/core';
import { CrudService } from '../crud-service.class';
import { Subscription, Observable } from 'rxjs';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { environment } from '@env/environment';
import {
  selectFiltros,
  selectPaginatorParams,
} from 'redux/ordenes-pago/ordenes-pago.selectors';

@Injectable({
  providedIn: 'root',
})
export class OrdenesPagoService extends CrudService implements OnDestroy {
  subscription: Subscription[] = [];
  filtros: any;
  parametros: PaginatorParamsInterface;

  constructor(http: HttpClient, public store: Store<AppState>) {
    super(http);
    const filterSub = this.store.select(selectFiltros).subscribe(vars => {
      this.filtros = vars;
    });

    const paramSub = this.store
      .select(selectPaginatorParams)
      .subscribe(params => {
        this.parametros = params;
      });

    this.subscription.push(filterSub, paramSub);
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
    return 'ordenes-pago';
  }

  ngOnDestroy() {
    this.subscription.map(sub => sub.unsubscribe());
  }
}
