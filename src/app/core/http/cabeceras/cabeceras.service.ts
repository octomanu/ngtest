import { Injectable, OnDestroy } from '@angular/core';
import { CrudService } from '../crud-service.class';
import { Observable, Subscription } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import {
  pageFilters,
  paginatorParams,
} from 'redux/cabeceras/cabeceras.selectors';

@Injectable({
  providedIn: 'root',
})
export class CabecerasService extends CrudService implements OnDestroy {
  filtersSubscription: Subscription;
  paramsSubscription: Subscription;
  filters: any;
  params: PaginatorParamsInterface;

  constructor(http: HttpClient, public store: Store<AppState>) {
    super(http);
    this.subscribe();
  }

  protected subscribe() {
    this.filtersSubscription = this.store
      .select(pageFilters)
      .subscribe(filters => (this.filters = filters));

    this.paramsSubscription = this.store
      .select(paginatorParams)
      .subscribe(params => (this.params = params));
  }

  ngOnDestroy() {
    this.filtersSubscription.unsubscribe();
    this.paramsSubscription.unsubscribe();
  }

  getPath() {
    return 'cabeceras';
  }

  paginate(): Observable<{}> {
    let params = new HttpParams();

    const url = `${environment.OCTO_API}/${this.getPath()}`;
    for (const key in this.filters) {
      if (this.filters[key]) {
        params = params.append(key, this.filters[key]);
      }
    }

    // tslint:disable-next-line: forin
    for (const key in this.params) {
      params = params.append(key, this.params[key]);
    }
    return this.http.get(url, { params });
  }
}
