import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { CrudService } from '../crud-service.class';

@Injectable({
  providedIn: 'root',
})
export class UnidadesFuncionalesService extends CrudService {
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
    return `unidades-funcionales/${this.idConsorcio}`;
  }
}
