import { Injectable } from '@angular/core';
import { CrudService } from '../crud-service.class';

@Injectable({
  providedIn: 'root',
})
export class ContactosService extends CrudService {
  getPath() {
    return 'contactos';
  }
}
