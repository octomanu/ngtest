import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IngresoForm {
  constructor(private fb: FormBuilder) {}
  getForm(): FormGroup {
    return this.fb.group({
      id: [null],
      fecha: [null, Validators.required],
      descripcion: [null, Validators.required],
      id_consorcio: [null, []],
      id_unidad_funcional: [null, []],
      efectivo: [
        null,
        [
          Validators.required,
          Validators.pattern('-?[0-9]{1,8}(?:.[0-9]{1,2})?'),
        ],
      ],
    });
  }
}
