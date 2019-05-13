import { Injectable } from '@angular/core';
import { CrudService } from '../crud-service.class';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GastosService extends CrudService {
  constructor(http: HttpClient) {
    super(http);
  }

  getPath() {
    return 'gastos';
  }

  findPrevious(params: {
    id_proveedor: string;
    id_consorcio: string;
    gasto: string;
  }) {
    let httpParams = new HttpParams();

    httpParams = httpParams
      .append('id_proveedor', params.id_proveedor)
      .append('id_consorcio', params.id_consorcio)
      .append('gasto', params.gasto);

    return this.http.get(`${this.url}/buscarAnterior`, { params }).pipe(
      map((resp: any) => {
        return resp.data;
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }
}
