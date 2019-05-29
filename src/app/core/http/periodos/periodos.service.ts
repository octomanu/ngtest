import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TableLambeServiceInterface } from 'app/interfaces/local/table-lambe-service.interface';

import { CrudService } from '../crud-service.class';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root',
})
export class PeriodosService extends CrudService {
  randomUserUrl = `${environment.OCTO_API}/proveedores`;

  constructor(http: HttpClient) {
    super(http);
  }

}
