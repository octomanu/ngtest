import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GastosForm {
  constructor(private fb: FormBuilder) {}

  getForm() {
    return this.fb.group({
      id: [null, []],
      administrable_id: [null, []],
      amount: [
        null,
        [Validators.required, Validators.pattern('[0-9]{1,8}(?:.[0-9]{1,2})?')],
      ],
      expire_date: [false, []],
      date: [null, []],
      description: [null, []],
      category_id: [null, []], //rubro
      provider_id: [null, []],
      service_id: [null, []],
      affect_financial_section: [null, []],
      prorate_in_expenses: [null, []],
      installments: this.initCuotasChild(),
    });
  }

  // getForm(): FormGroup {
  //   return this.fb.group({
  //     id: [null, []],
  //     id_proveedor: [null, []],
  //     id_consorcio: [null, []],
  //     id_rubro: [null, []],
  //     descripcion: [null, [Validators.required]],
  //     monto: [
  //       null,
  //       [Validators.required, Validators.pattern('[0-9]{1,8}(?:.[0-9]{1,2})?')],
  //     ],
  //     fecha: [null, [Validators.required]],
  //     prevision: [false, [Validators.required]],
  //     prorrateable: [null, []],
  //     periodicidad: [null, []],

  //     cuotas: this.initCuotasChild(),
  //   });
  // }

  initCuotasChild(amount = 1) {
    const array = [];
    for (let i = 0; i < amount; i++) {
      array.push(
        this.fb.group({
          amount: [
            null,
            [
              Validators.required,
              Validators.pattern('[0-9]{1,8}(?:.[0-9]{1,2})?'),
            ],
          ],
          pay_date: [null, [Validators.required]],
        }),
      );
    }

    return this.fb.array(array);
  }
}
