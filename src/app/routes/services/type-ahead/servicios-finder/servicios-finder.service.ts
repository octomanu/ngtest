import { Injectable } from '@angular/core';
import { TypeAhead } from '../type-ahead.class';
import { ServiciosService } from '@core/http/servicios/servicios.service';

@Injectable()
export class ServiciosFinderService extends TypeAhead {
  constructor(protected serviciosService: ServiciosService) {
    super(serviciosService);
    this.search('', false);
  }
}
