import { Injectable, OnDestroy } from '@angular/core';
import { CrudService } from '../crud-service.class';
import { Subscription, Observable } from 'rxjs';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { CuentaCorrienteProveedorState } from 'redux/cuenta-corriente-proveedor/cuenta-corriente-proveedor.reducer';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CuentaCorrienteProveedorService extends CrudService
  implements OnDestroy {
  subscription: Subscription;
  filtros: any;
  parametros: PaginatorParamsInterface;

  constructor(http: HttpClient, public store: Store<AppState>) {
    super(http);
    this.subscription = this.store
      .select('cuentaCorrienteProveedor')
      .subscribe((state: CuentaCorrienteProveedorState) => {
        this.filtros = state.filtros;
        this.parametros = state.paginator.parametros;
        this.filtros.id_proveedor = state.id_proveedor;
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
    return 'cuenta-corriente-proveedor';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
