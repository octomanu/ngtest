import { Injectable } from '@angular/core';
import { CrudService } from '../crud-service.class';

@Injectable({
  providedIn: 'root',
})
export class PeriodosService extends CrudService {
  getPath() {
    return 'periodos';
  }
}
