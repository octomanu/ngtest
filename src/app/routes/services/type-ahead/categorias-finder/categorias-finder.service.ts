import { Injectable } from '@angular/core';
import { TypeAhead } from '../type-ahead.class';
import { CategoriasService } from '@core/http/categorias/categorias.service';

@Injectable()
export class CategoriasFinderService extends TypeAhead {
  constructor(protected categoriasService: CategoriasService) {
    super(categoriasService);
    this.search('', false);
  }
}
