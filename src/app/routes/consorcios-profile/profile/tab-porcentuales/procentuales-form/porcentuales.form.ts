import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PorcentualesForm {
  constructor(private fb: FormBuilder) {}
  getForm() {
    return this.fb.group({
      id: [null, []],
      nombre: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      oculto_en_expensa: [false, [Validators.required]],
      posicion: [null, [Validators.required]],
      es_gasto_particular: [false, [Validators.required]],
      oculto_en_prorrateo: [false, [Validators.required]],
      ocultar_porcentaje: [false, [Validators.required]],
      tipo: ['gastos', [Validators.required]],
    });
  }
}
