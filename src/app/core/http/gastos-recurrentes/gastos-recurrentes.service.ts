import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../crud-service.class';

@Injectable({
  providedIn: 'root',
})
export class GastosRecurrentesService extends CrudService {
  constructor(http: HttpClient) {
    super(http);
  }

  getPath() {
    return 'gastos-recurrentes';
  }
}
