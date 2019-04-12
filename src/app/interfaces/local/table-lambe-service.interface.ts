import { PaginatorParamsInterface } from './paginator-params.interface';
import { Observable } from 'rxjs';

export interface TableLambeServiceInterface {
  // Busca la data en la API
  paginar(params: PaginatorParamsInterface, filtros: {}): Observable<{}>;
}
