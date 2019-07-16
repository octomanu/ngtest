import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UnidadesFuncionalesForm {
  constructor(private fb: FormBuilder) {}
  getForm() {
    return this.fb.group({
      id: [null, []],
      ordenamiento: [null, [Validators.required]],
      piso: [null, [Validators.required]],
      depto: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      tipo_uf: [null, [Validators.required]],
      tipo_perdon_interes: [null, [Validators.required]],
      estado_legal: [null, [Validators.required]],
      m2: [
        null,
        [
          Validators.required,
          Validators.pattern('-?[0-9]{1,8}(?:.[0-9]{1,2})?'),
        ],
      ],
    });
  }
}
