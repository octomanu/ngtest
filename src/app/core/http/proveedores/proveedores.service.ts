import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TableLambeServiceInterface } from 'app/interfaces/local/table-lambe-service.interface';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProveedoresService implements TableLambeServiceInterface {
  randomUserUrl = 'http://192.168.3.222/proveedores';

  constructor(private http: HttpClient) {}

  paginate(parametros: {}, filtros: {}): Observable<{}> {
    let params = new HttpParams();

    for (const key in filtros) {
      if (filtros[key]) {
        params = params.append(key, filtros[key]);
      }
    }

    for (const key in parametros) {
      if (parametros[key]) {
        params = params.append(key, parametros[key]);
      }
    }

    return this.http.get(`${this.randomUserUrl}`, { params }).pipe(
      map(resp => resp),
      catchError(err => throwError(err)),
    );
  }

  eliminarProveedor(id: number) {
    const URL = `${this.randomUserUrl}/${id}`;

    return this.http.delete(URL).pipe(
      map(resp => resp),
      catchError(err => throwError(err)),
    );
  }

  crearProveedor(proveedor: Proveedor) {
    const URL = `${this.randomUserUrl}`;

    return this.http.post(URL, proveedor).pipe(
      map(resp => resp),
      catchError(err => throwError(err)),
    );
  }

  actualizarProveedor(id: number, proveedor: Proveedor) {
    const URL = `${this.randomUserUrl}/${id}`;

    return this.http.put(URL, proveedor).pipe(
      map(resp => resp),
      catchError(err => throwError(err)),
    );
  }

  buscarProveedor(id: number) {
    const URL = `${this.randomUserUrl}/${id}`;

    return this.http.get(URL).pipe(
      map((resp: any) => resp.data),
      catchError(err => throwError(err)),
    );
  }
}
