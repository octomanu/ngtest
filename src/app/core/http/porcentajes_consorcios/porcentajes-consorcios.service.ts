import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CrudService } from '../crud-service.class';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PorcentajesConsorciosService extends CrudService {
  protected randomUserUrl = `${environment.OCTO_API}/proveedores`;
  protected idConsorcio: string;

  constructor(http: HttpClient) {
    super(http);
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
