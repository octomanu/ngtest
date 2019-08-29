import { Injectable } from '@angular/core';
import { ChequesService } from '@core/http/cheques/cheques.service';
import { TypeAhead } from '../type-ahead.class';

@Injectable()
export class ChequesFinderService extends TypeAhead {
  constructor(public chequesService: ChequesService) {
    super(chequesService);
  }
}
