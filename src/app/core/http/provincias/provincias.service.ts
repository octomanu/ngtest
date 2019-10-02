import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProvinciasService {
  constructor(private http: HttpClient) {}

  searchByDisplay(display: string, id?: string) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/buscar`;
    let params = new HttpParams();
    params = params.append('display', display);
    params = id ? params.append('id', id) : params;
    return this.http.get(URL, { params }).pipe(
      map((resp: any) => {
        return resp.data;
      }),
      catchError(err => throwError(err)),
    );
  }

  getPath() {
    return 'provincias';
  }
}
