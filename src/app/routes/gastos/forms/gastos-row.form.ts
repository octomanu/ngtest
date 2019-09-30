import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable()
export class GastosRowForm {
  public form: FormGroup;

  constructor(protected fb: FormBuilder) {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      id: [null, []],
      monto: [
        null,
        [
          Validators.required,
          Validators.pattern('-?[0-9]{1,8}(?:.[0-9]{1,2})?'),
        ],
      ],
      fecha_pago: [null, [Validators.required]],
      numero_factura: [null, []],
    });
  }

  resolve() {
    const formValue = { ...this.form.value };
    delete formValue.numero_factura;
    formValue.fecha_pago = moment(formValue.fecha_pago).format('DD-MM-YYYY');
    return formValue;
  }
}
