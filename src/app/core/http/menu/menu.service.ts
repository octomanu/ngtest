import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(protected http: HttpClient) {}

  getMenu() {
    const URL = `${environment.OCTO_API}/menu`;

    return this.http.delete(URL).pipe(
      map(resp => resp),
      catchError(err => throwError(err)),
    );
  }
}
