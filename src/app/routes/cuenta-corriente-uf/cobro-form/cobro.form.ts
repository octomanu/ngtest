import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CobroForm {
  constructor(private fb: FormBuilder) {}
  getForm(): FormGroup {
    return this.fb.group(
      {
        id: [null],
        fecha: [null, Validators.required],
        descripcion: [null, Validators.required],
        id_cheque_tercero: [null, []],
        efectivo: [null, [Validators.pattern('-?[0-9]{1,8}(?:.[0-9]{1,2})?')]],
        transferencia: [
          null,
          [Validators.pattern('-?[0-9]{1,8}(?:.[0-9]{1,2})?')],
        ],
      },
      { validator: amountValidator },
    );
  }
}
export function amountValidator(form: FormGroup) {
  const efectivo = form.value.efectivo;
  const transferencia = form.value.transferencia;
  return efectivo || transferencia ? null : { amount: true };
}
