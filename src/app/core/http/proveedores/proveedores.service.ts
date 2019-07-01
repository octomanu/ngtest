import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CrudService } from '../crud-service.class';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root',
})
export class ProveedoresService extends CrudService {
  constructor(http: HttpClient) {
    super(http);
  }

  getPath() {
    return 'proveedores';
  }

  searchProveedor(display: string) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/buscar`;
    let params = new HttpParams();
    params = params.append('display', display);
    return this.http.get(URL, { params }).pipe(
      map((resp: any) => resp.data),
      catchError(err => throwError(err)),
    );
  }
}
