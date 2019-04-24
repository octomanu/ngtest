import { PaginatorParamsInterface } from './paginator-params.interface';
import { Observable } from 'rxjs';

export interface TableLambeServiceInterface {
  // Busca la data en la API
  paginate(params: PaginatorParamsInterface, filtros: {}): Observable<{}>;
}
