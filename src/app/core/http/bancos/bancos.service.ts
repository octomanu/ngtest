import { Injectable } from '@angular/core';
import { CrudService } from '../crud-service.class';

@Injectable({
  providedIn: 'root',
})
export class BancosService extends CrudService {
  getPath() {
    return 'bancos';
  }
}
