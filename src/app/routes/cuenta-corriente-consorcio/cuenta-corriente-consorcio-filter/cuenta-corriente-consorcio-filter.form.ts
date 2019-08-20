import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CuentaCorrienteConsorcioFilterForm {
  constructor(private fb: FormBuilder) {}
  getForm(): FormGroup {
    return this.fb.group({
      descripcion: [null, []],
      fecha: [null, []],
      monto: [null, []],
    });
  }
}
