import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TableLambeServiceInterface } from 'app/interfaces/local/table-lambe-service.interface';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService implements TableLambeServiceInterface {
  randomUserUrl = 'http://192.168.3.222/proveedores';

  constructor(private http: HttpClient) {}

  paginar(parametros: {}, filtros: {}): Observable<{}> {
    let params = new HttpParams();

    for (const key in filtros) {
      params = params.append(key, filtros[key]);
    }
    for (const key in parametros) {
      params = params.append(key, parametros[key]);
    }
    return this.http.get(`${this.randomUserUrl}`, { params }).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  eliminarProveedor(id: number) {
    const URL = `${this.randomUserUrl}/${id}`;

    return this.http.delete(URL).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  crearProveedor(proveedor: Proveedor) {
    const URL = `${this.randomUserUrl}`;

    return this.http.post(URL, proveedor).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  actualizarProveedor(id: number, proveedor: Proveedor) {
    const URL = `${this.randomUserUrl}/${id}`;

    return this.http.put(URL, proveedor).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  buscarProveedor(id: number) {
    const URL = `${this.randomUserUrl}/${id}`;

    return this.http.get(URL).pipe(
      map((resp: any) => {
        return resp.proveedor;
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }
}
