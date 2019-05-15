import { Injectable } from '@angular/core';

import { CrudService } from '../crud-service.class';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService extends CrudService {
  constructor(http: HttpClient) {
    super(http);
  }

  getPath() {
    return 'servicios';
  }

  searchByDisplay(display: string) {
    const URL = `${this.url}/buscar`;
    let params = new HttpParams();
    params = params.append('display', display);
    return this.http.get(URL, { params }).pipe(
      map((resp: any) => resp.data),
      catchError(err => throwError(err)),
    );
  }
}
