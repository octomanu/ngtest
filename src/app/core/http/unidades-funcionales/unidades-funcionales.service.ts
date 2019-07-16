import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { CrudService } from '../crud-service.class';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnidadesFuncionalesService extends CrudService {
  protected randomUserUrl = `${environment.OCTO_API}/proveedores`;
  protected idConsorcio: string;

  setConsorcio(id: string) {
    this.idConsorcio = id;
  }

  getConsorcio() {
    return this.idConsorcio;
  }

  searchByDisplay(display: string) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/buscar`;
    let params = new HttpParams();
    params = params.append('display', display);
    return this.http.get(URL, { params }).pipe(
      map((resp: any) => resp.data),
      catchError(err => throwError(err)),
    );
  }

  getPath() {
    if (!this.idConsorcio) {
      throw new Error('No hay consorcio seteado.');
    }
    return `unidades-funcionales/${this.idConsorcio}`;
  }
}
