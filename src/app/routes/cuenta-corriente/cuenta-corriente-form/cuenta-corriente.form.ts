import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CuentaCorrienteForm {
  constructor(private fb: FormBuilder) {}
  getForm(): FormGroup {
    return this.fb.group({
      monto: [
        null,
        [
          Validators.required,
          Validators.pattern('-?[0-9]{1,8}(?:.[0-9]{1,2})?'),
        ],
      ],
      fecha: [null, [Validators.required]],
      id_consorcio: [null, [Validators.required]],
      tipo: ['ingreso', [Validators.required]],
      descripcion: [null, [Validators.required]],
    });
  }
}
