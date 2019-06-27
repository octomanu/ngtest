import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GastosRecurrentesForm {
  constructor(private fb: FormBuilder) {}
  getForm(): FormGroup {
    return this.fb.group({
      name: ['Alain', []],
      description: ['item menu', []],
      id_consorcio: [null, []],
      id_proveedor: [null, []],
      id_porcentaje_consorcio: [null, []],
      periodicidad: [[], []],
      tipo: [null, []],
      descripcion: [null, [Validators.required]],
      valor: [
        null,
        [
          Validators.required,
          Validators.pattern('-?[0-9]{1,8}(?:.[0-9]{1,2})?'),
        ],
      ],
      fecha_primer_pago: [null, [Validators.required]],
      fecha_limite: [null, [Validators.required]],
      mes_comienzo: [null, [Validators.required]],
    });
  }
}
