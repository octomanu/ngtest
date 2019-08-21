import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeudaForm {
  constructor(private fb: FormBuilder) {}
  getForm(): FormGroup {
    return this.fb.group({
      id: [null],
      fecha: [null, Validators.required],
      descripcion: [null, Validators.required],
      id_cheque: [null, []],
      monto: [null, [Validators.pattern('-?[0-9]{1,8}(?:.[0-9]{1,2})?')]],
    });
  }
}
