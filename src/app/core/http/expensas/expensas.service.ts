import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExpensasService {
  constructor(private http: HttpClient) {}

  preview(idConsorcio: string) {
    const params = new HttpParams().append('id_consorcio', idConsorcio);
    const url = `${environment.OCTO_API}/${this.getPath()}/previsualizar`;
    return this.http
      .get(url, { params })
      .pipe(map((resp: any) => resp.data.html));
  }

  getPath() {
    return 'expensas';
  }
}
