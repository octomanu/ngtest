import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotasForm {
  constructor(private fb: FormBuilder) {}
  getForm(): FormGroup {
    return this.fb.group({
      id: [null, []],
      titulo: [null, [Validators.required]],
      contenido: [null, [Validators.required]],
      es_nota_de_deuda: [false, [Validators.required]],
      es_pie_prorrateo: [false, [Validators.required]],
      fecha_limite: [null, []],
    });
  }
}
