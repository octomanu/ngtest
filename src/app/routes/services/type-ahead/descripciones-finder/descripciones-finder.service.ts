import { Injectable } from '@angular/core';
import { GastosDescripcionesService } from '@core/http/gastos-descripciones/gastos-descripciones.service';
import { TypeAhead } from '../type-ahead.class';

@Injectable()
export class DescripcionesFinderService extends TypeAhead {
  constructor(protected descripcionesService: GastosDescripcionesService) {
    super(descripcionesService);
    this.search('', false);
  }
}
