import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../crud-service.class';

@Injectable({
  providedIn: 'root',
})
export class PorcentajesConsorciosService extends CrudService {
  protected randomUserUrl = `${environment.OCTO_API}/proveedores`;
  protected idConsorcio: string;

  constructor(http: HttpClient) {
    super(http);
  }

  setConsorcio(id: string) {
    this.idConsorcio = id;
  }

  getPath() {
    if (!this.idConsorcio) {
      throw new Error('No hay consorcio seteado.');
    }
    return `porcentajes-consorcios/${this.idConsorcio}`;
  }
}
