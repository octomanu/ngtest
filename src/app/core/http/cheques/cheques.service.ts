import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CrudService } from '../crud-service.class';
import { environment } from '@env/environment';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TypeAheadService } from 'app/interfaces/local/type-ahead-service.interface';
import { ServicePathGetter } from '../service-path-getter.interface';

@Injectable({
  providedIn: 'root',
})
export class ChequesService extends CrudService
  implements TypeAheadService, ServicePathGetter {
  constructor(http: HttpClient) {
    super(http);
  }

  searchByDisplay(display: string, id?: string) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/buscar`;
    let params = new HttpParams();
    params = params.append('display', display);
    params = id ? params.append('id', id) : params;
    return this.http.get(URL, { params }).pipe(
      map((resp: any) => resp.data),
      catchError(err => throwError(err)),
    );
  }

  getPath() {
    return 'cheques';
  }
}
