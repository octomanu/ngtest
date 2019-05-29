import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GastosForm {
  constructor(private fb: FormBuilder) {}
  getForm(): FormGroup {
    return this.fb.group({
      id: [null, []],
      monto: [
        null,
        [Validators.required, Validators.pattern('-?[0-9]{1,8}(?:.[0-9]{1,2})?')],
      ],
      fecha: [null, [Validators.required]],
    });
  }
}
