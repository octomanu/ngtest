import { Injectable } from '@angular/core';
import { ServicePathGetter } from '../service-path-getter.interface';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable, Subscription } from 'rxjs';
import { CrudService } from '../crud-service.class';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { SueldosState } from 'redux/sueldos/sueldos.reducer';
import { selectSueldos } from 'redux/sueldos/sueldos.selectors';

@Injectable({
  providedIn: 'root',
})
export class SueldosService extends CrudService implements ServicePathGetter {
  subscription: Subscription;
  filtros: any;
  parametros: PaginatorParamsInterface;
  idEmpleado: number;

  constructor(http: HttpClient, public store: Store<AppState>) {
    super(http);
    this.subscription = this.store
      .select(selectSueldos)
      .subscribe((state: SueldosState) => {
        this.filtros = state.filtros;
        this.parametros = state.paginator.parametros;
        this.idEmpleado = state.id_empleado;
      });
  }

  generateReceipt(id: number) {
    const URL = `${
      environment.OCTO_API
    }/${this.getPath()}/generar-recibo/${id}`;
    return this.http.get(URL);
  }

  calculateSalary(data) {
    return this.post('calcular-mensual', data);
  }

  calculateVacation(data) {
    return this.post('calcular-vacaciones', data);
  }

  calculateIntermediate(data) {
    return this.post('calcular-intermedio', data);
  }

  calculateSac(data) {
    return this.post('calcular-sac', data);
  }

  saveSac(data) {
    return this.post('guardar-sac', data);
  }

  saveSalary(data) {
    return this.post('guardar-mensual', data);
  }

  saveVacation(data) {
    return this.post('guardar-vacaciones', data);
  }

  saveIntermediate(data) {
    return this.post('guardar-intermedio', data);
  }

  paginate(): Observable<{}> {
    let params = new HttpParams();
    params = params.append('id_empleado', this.idEmpleado + '');

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

  protected post(endUrl: string, data: any) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/${endUrl}`;
    return this.http.post(URL, data).pipe(
      map((resp: any) => resp.data),
      catchError(err => throwError(err)),
    );
  }

  getPath() {
    return 'sueldos';
  }
}
