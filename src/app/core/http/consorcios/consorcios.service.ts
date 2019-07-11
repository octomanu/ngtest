import { Injectable } from '@angular/core';
import { TableLambeServiceInterface } from 'app/interfaces/local/table-lambe-service.interface';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { Observable, throwError } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { CrudService } from '../crud-service.class';
@Injectable({
  providedIn: 'root',
})
export class ConsorciosService extends CrudService {
  url = `${environment.OCTO_API}/consorcios`;

  getPath() {
    return 'consorcios';
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
