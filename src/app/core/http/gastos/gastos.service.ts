import { Injectable } from '@angular/core';
import { CrudService } from '../crud-service.class';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '@env/environment';

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

  updateMontoFecha(id: number, data) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/editarGrilla/${id}`;

    return this.http.put(URL, data).pipe(
      map(resp => resp),
      catchError(err => throwError(err)),
    );
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
    const URL = `${environment.OCTO_API}/${this.getPath()}/buscarAnterior`;
    return this.http.get(`${URL}`, { params }).pipe(
      map((resp: any) => {
        return resp.data;
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }
}
