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
  getUsers(
    pageIndex: number = 1,
    pageSize: number = 10,
    sortField: string | null,
    sortOrder: string | null,
    genders: string[],
  ): Observable<{}> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('page_size', `${pageSize}`);

    if (sortField) {
      console.log(sortField);
      params = params.append('sort_field', sortField);
    }
    if (sortOrder) {
      params = params.append('sort_order', sortOrder);
    }
    // genders.forEach(gender => {
    //   params = params.append('gender', gender);
    // });
    console.log(params);
    return this.http.get(`${this.randomUserUrl}`, {
      params,
    });
  }

  eliminarProveedor(id: number) {

    const URL = `http://localhost/proveedores/${id}`;

    // HTTP POST using these headers


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
