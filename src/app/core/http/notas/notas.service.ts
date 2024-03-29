import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../crud-service.class';

@Injectable({
  providedIn: 'root',
})
export class NotasService extends CrudService {
  getPath() {
    return 'notas';
  }
}
