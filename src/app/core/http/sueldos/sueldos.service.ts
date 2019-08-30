import { Injectable } from '@angular/core';
import { ServicePathGetter } from '../service-path-getter.interface';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SueldosService implements ServicePathGetter {
  public salaryPreview: any;
  constructor(protected http: HttpClient) {}

  calculateSalary(data) {
    return this.post('calcular-mensual', data);
  }

  calculateVacation(data) {
    return this.post('calcular-vacaciones', data);
  }

  calculateIntermediate(data) {
    return this.post('calcular-intermedio', data);
  }

  calculateSac(data) {
    return this.post('calcular-sac', data);
  }

  protected post(endUrl: string, data: any) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/${endUrl}`;

    return this.http.post(URL, data).pipe(
      map((resp: any) => resp.data),
      catchError(err => throwError(err)),
    );
  }

  getPath() {
    return 'sueldos';
  }
}
