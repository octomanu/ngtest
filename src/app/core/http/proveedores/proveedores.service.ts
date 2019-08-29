import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CrudService } from '../crud-service.class';
import { environment } from '@env/environment';
import { TypeAheadService } from 'app/interfaces/local/type-ahead-service.interface';
import { ServicePathGetter } from '../service-path-getter.interface';
@Injectable({
  providedIn: 'root',
})
export class ProveedoresService extends CrudService
  implements TypeAheadService, ServicePathGetter {
  searchByDisplay(display: string) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/buscar`;
    let params = new HttpParams();
    params = params.append('display', display);
    return this.http.get(URL, { params }).pipe(
      map((resp: any) => resp.data),
      catchError(err => throwError(err)),
    );
  }

  getPath() {
    return 'proveedores';
  }
}
