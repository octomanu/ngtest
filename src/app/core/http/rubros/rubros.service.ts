import { Injectable } from '@angular/core';
import { CrudService } from '../crud-service.class';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RubrosService extends CrudService {
  constructor(http: HttpClient) {
    super(http);
  }

  getPath() {
    return 'rubros';
  }
}
