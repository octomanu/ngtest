import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { SetUserAction } from 'redux/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  public login(email: string, password: string) {
    const URL = `${environment.OCTO_API}/auth/login`;

    return this.http.post(URL, { email, password }).pipe(
      map((resp: any) => {
        this.store.dispatch(new SetUserAction(resp));
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
