import { Injectable } from '@angular/core';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { TypeAhead } from '../type-ahead.class';

@Injectable()
export class ProveedorFinderService extends TypeAhead {
  constructor(protected proveedoresService: ProveedoresService) {
    super(proveedoresService);
    this.search('', false);
  }
}
