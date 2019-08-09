import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstadoEmpleadosService {
  url = `${environment.OCTO_API}/estado-empleados`;

  constructor(public http: HttpClient) {}

  searchByDisplay(display: string, id?: string) {
    const URL = `${this.url}/buscar`;
    let params = new HttpParams();
    params = params.append('display', display);
    params = id ? params.append('id', id) : params;
    return this.http.get(URL, { params }).pipe(
      map((resp: any) => resp.data),
      catchError(err => throwError(err)),
    );
  }
}
