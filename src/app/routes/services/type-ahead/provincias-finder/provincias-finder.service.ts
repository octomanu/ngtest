import { Injectable } from '@angular/core';
import { ProvinciasService } from '@core/http/provincias/provincias.service';
import { TypeAhead } from '../type-ahead.class';

@Injectable({
  providedIn: 'root',
})
export class ProvinciasFinderService extends TypeAhead {
  constructor(protected provinciasService: ProvinciasService) {
    super(provinciasService);
    this.search('', false);
  }
}
