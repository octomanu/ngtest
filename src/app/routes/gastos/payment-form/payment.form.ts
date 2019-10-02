import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentForm {
  constructor(private fb: FormBuilder) {}
  getForm(): FormGroup {
    return this.fb.group(
      {
        id: [null],
        fecha: [null, Validators.required],
        descripcion: [null, [Validators.required, Validators.maxLength(255)]],
        id_cheque: [null, []],
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
  return form.value.efectivo ||
    form.value.transferencia ||
    form.value.id_cheque ||
    form.value.transferencia
    ? null
    : { amount: true };
}
