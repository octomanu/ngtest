import { Injectable } from '@angular/core';
import { TypeAhead } from '../type-ahead.class';
import { EmpleadosService } from '@core/http/empleados/empleados.service';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosFinderService extends TypeAhead {
  constructor(empleadosService: EmpleadosService) {
    super(empleadosService);
    this.search('', false);
  }
}
