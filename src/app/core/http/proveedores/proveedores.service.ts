import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {
  randomUserUrl = 'http://localhost/proveedores';

  constructor(private http: HttpClient) {}

  getUsers(parametros: {}, filtros: {}): Observable<{}> {
    let params = new HttpParams();

    for (const key in filtros) {
      params = params.append(key, filtros[key]);
    }
    for (const key in parametros) {
      params = params.append(key, parametros[key]);
    }
    console.log(params);
    return this.http.get(`${this.randomUserUrl}`, { params });
  }

  eliminarProveedor(id: number) {
    const URL = `http://localhost/proveedores/${id}`;

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
    const URL = `http://localhost/proveedores`;

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
    const URL = `http://localhost/proveedores/${id}`;

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
    const URL = `http://localhost/proveedores/${id}`;

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
