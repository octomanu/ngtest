import { Injectable } from '@angular/core';
import { CrudService } from '../crud-service.class';
import { environment } from '@env/environment';
import { HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService extends CrudService {
  getPath() {
    return 'servicios';
  }

  searchByDisplay(display: string) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/buscar`;
    let params = new HttpParams();
    params = params.append('display', display);
    return this.http.get(URL, { params }).pipe(
      map((resp: any) => resp.data),
      catchError(err => throwError(err)),
    );
  }
}
