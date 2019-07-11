import { Injectable } from '@angular/core';
import { CrudService } from '../crud-service.class';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService extends CrudService {
  getPath() {
    return 'empleados';
  }
}
