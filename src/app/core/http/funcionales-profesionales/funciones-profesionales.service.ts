import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root',
})
export class FuncionesProfesionalesService {
  url = `${environment.OCTO_API}/consorcios`;

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
  getPath() {
    return 'funciones-profesionales';
  }
}
