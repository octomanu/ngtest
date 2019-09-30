import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError, first, switchMap, mergeMap } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';
import { CrudService } from '../crud-service.class';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { paginatorRequestParams } from 'redux/categorias/page/page.selectors';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService extends CrudService {
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

  searchByDisplay(display: string) {
    const URL = `${environment.OCTO_API}/categorias/buscar`;
    let params = new HttpParams();
    params = params.append('display', display);
    return this.http.get(URL, { params }).pipe(
      map((resp: any) => resp.data),
      catchError(err => throwError(err)),
    );
  }

  getPath() {
    return 'categorias';
  }
}
