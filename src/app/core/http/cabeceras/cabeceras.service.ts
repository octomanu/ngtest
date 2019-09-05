import { Injectable, OnDestroy } from '@angular/core';
import { CrudService } from '../crud-service.class';
import { Observable, Subscription } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { paginatorRequestParams } from 'redux/cabeceras/cabeceras.selectors';

@Injectable({
  providedIn: 'root',
})
export class CabecerasService extends CrudService implements OnDestroy {
  filtersSubscription: Subscription;
  paramsSubscription: Subscription;
  requestParams: any;

  constructor(http: HttpClient, public store: Store<AppState>) {
    super(http);
    this.subscribe();
  }

  protected subscribe() {
    this.filtersSubscription = this.store
      .select(paginatorRequestParams)
      .subscribe(requestParams => (this.requestParams = requestParams));
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
    for (const key in this.requestParams) {
      if (this.requestParams[key]) {
        params = params.append(key, this.requestParams[key]);
      }
    }
    return this.http.get(url, { params });
  }
}
