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
    const URL = `${environment.OCTO_API}/${this.getPath()}/calcular-mensual`;

    return this.http.post(URL, data).pipe(
      map((resp: any) => resp.data),
      catchError(err => throwError(err)),
    );
  }

  calculateVacation(data) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/calcular-vacaciones`;

    return this.http.post(URL, data).pipe(
      map((resp: any) => resp.data),
      catchError(err => throwError(err)),
    );
  }

  calculateIntermediate(data) {
    const URL = `${environment.OCTO_API}/${this.getPath()}/calcular-intermedio`;

    return this.http.post(URL, data).pipe(
      map((resp: any) => resp.data),
      catchError(err => throwError(err)),
    );
  }

  getPath() {
    return 'sueldos';
  }
}
