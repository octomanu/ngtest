import { Injectable, OnDestroy } from '@angular/core';
import { CrudService } from '../crud-service.class';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Subscription, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import * as fromChequeras from 'redux/chequeras/chequeras.reducer';

@Injectable({
  providedIn: 'root',
})
export class ChequerasService extends CrudService implements OnDestroy {
  subscription: Subscription;
  filtros: any;
  parametros: PaginatorParamsInterface;

  constructor(http: HttpClient, public store: Store<AppState>) {
    super(http);
    this.subscription = this.store
      .select('serviciosState')
      .subscribe((state: fromChequeras.ChequerasState) => {
        this.filtros = state.filtros;
        this.parametros = state.paginator.parametros;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  searchCheckbook(display: string) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/buscar`;
    let params = new HttpParams();
    params = params.append('display', display);
    return this.http.get(URL, { params }).pipe(
      map((resp: any) => resp.data),
      catchError(err => throwError(err)),
    );
  }

  getPath(): string {
    return 'chequeras';
  }
}
