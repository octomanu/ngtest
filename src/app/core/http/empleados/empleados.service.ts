import { Injectable } from '@angular/core';
import { CrudService } from '../crud-service.class';
import { TypeAheadService } from 'app/interfaces/local/type-ahead-service.interface';
import { HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService extends CrudService implements TypeAheadService {
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
    return 'empleados';
  }
}
