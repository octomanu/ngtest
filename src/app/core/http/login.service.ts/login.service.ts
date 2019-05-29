import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public login(email: string, password: string) {
    const URL = `${environment.OCTO_API}/auth/login`;

    return this.http.post(URL, { email, password }).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  public renovarToken() {
    const URL = `${environment.OCTO_API}/auth/renovar`;

    return this.http.get(URL).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }
}
