import { Injectable } from '@angular/core';
import { CrudService } from './crud-service.class';
import { environment } from '@env/environment';
import { HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChequesTercerosService extends CrudService {
  searchByDisplay(display: string, id?: string) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/buscar`;
    let params = new HttpParams();
    params = params.append('display', display);
    params = id ? params.append('id', id) : params;
    return this.http.get(URL, { params }).pipe(
      map((resp: any) => resp.data),
      catchError(err => throwError(err)),
    );
  }

  searchByDisplayForIngreso(display: string, id?: string) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/buscar-ingreso`;
    let params = new HttpParams();
    params = params.append('display', display);
    params = id ? params.append('id', id) : params;
    return this.http.get(URL, { params }).pipe(
      map((resp: any) => resp.data),
      catchError(err => throwError(err)),
    );
  }

  searchByDisplayForEgreso(display: string, id?: string) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/buscar-egreso`;
    let params = new HttpParams();
    params = params.append('display', display);
    params = id ? params.append('id', id) : params;
    return this.http.get(URL, { params }).pipe(
      map((resp: any) => resp.data),
      catchError(err => throwError(err)),
    );
  }

  getPath() {
    return 'cheques-externos';
  }
}
