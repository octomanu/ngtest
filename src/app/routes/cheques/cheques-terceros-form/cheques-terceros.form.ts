import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChequesTercerosForm {
  constructor(private fb: FormBuilder) {}

  getForm() {
    return this.fb.group({
      id: [null, []],
      fecha_vencimiento: [null, [Validators.required]],
      cruzado: [false, [Validators.required]],
      a_la_orden: [false, [Validators.required]],
      monto: [
        null,
        [Validators.required, Validators.pattern('[0-9]{1,8}(?:.[0-9]{1,2})?')],
      ],
      numero: [null, [Validators.required]],
    });
  }
}
