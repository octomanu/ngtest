import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { CrudService } from '../crud-service.class';
import { Observable, of } from 'rxjs';
import { mergeMap, first, map, switchMap } from 'rxjs/operators';
import { environment } from '@env/environment';
import { paginatorRequestParams } from 'redux/juicios/page/page.selectors';

@Injectable({
  providedIn: 'root',
})
export class JuiciosService extends CrudService {
  constructor(http: HttpClient, private store: Store<AppState>) {
    super(http);
  }

  findObs(id$: Observable<number>) {
    return of(null).pipe(
      mergeMap(() => id$.pipe(first())),
      map(id => `${environment.OCTO_API}/${this.getPath()}/mostrar/${id}`),
      mergeMap(url =>
        this.http.get(url).pipe(
          map((resp: any) => {
            if (resp.data) {
              return resp.data;
            }
            return resp;
          }),
        ),
      ),
    );
  }

  paginate(): Observable<{}> {
    const url = `${environment.OCTO_API}/${this.getPath()}`;
    return this.store.select(paginatorRequestParams).pipe(
      first(),
      map(requestParams => {
        let params = new HttpParams();
        for (const key in requestParams) {
          if (requestParams[key]) {
            params = params.append(key, requestParams[key]);
          }
        }
        return params;
      }),
      switchMap(params => this.http.get(url, { params })),
    );
  }

  getPath() {
    return 'juicios';
  }
}
