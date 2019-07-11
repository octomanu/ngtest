import { Injectable } from '@angular/core';
import { CrudService } from '../crud-service.class';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService extends CrudService {
  getPath() {
    return 'servicios';
  }
}
