import { Injectable } from '@angular/core';
import { PorcentajesConsorciosService } from '@core/http/porcentajes_consorcios/porcentajes-consorcios.service';
import { TypeAhead } from '../type-ahead.class';

@Injectable()
export class PorcentajesFinderService extends TypeAhead {
  constructor(private porcentajesService: PorcentajesConsorciosService) {
    super(porcentajesService);
  }

  set idConsorcio(id: string) {
    this.porcentajesService.setConsorcio(id);
    if (id) {
      this.searchList('');
    } else {
      this.optionsSubject$.next([]);
      this.isLoading$.next(false);
    }
  }
}
