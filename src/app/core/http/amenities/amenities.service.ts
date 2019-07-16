import { Injectable } from '@angular/core';
import { CrudService } from '../crud-service.class';

@Injectable({
  providedIn: 'root',
})
export class AmenitiesService extends CrudService {
  protected idConsorcio: string;
  setConsorcio(id: string) {
    this.idConsorcio = id;
  }

  getConsorcio() {
    return this.idConsorcio;
  }

  getPath() {
    if (!this.idConsorcio) {
      throw new Error('No hay consorcio seteado.');
    }
    return `amenities/${this.idConsorcio}`;
  }
}
