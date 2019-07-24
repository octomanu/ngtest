import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConsorcioForm {
  constructor(private fb: FormBuilder) {}
  getForm() {
    return this.fb.group({
      id: [null, []],
      calle: [null, [Validators.required]],
      cantidad_pisos: [null, [Validators.required]],
      cantidad_ufs: [null, [Validators.required]],
      codigo: [null, [Validators.required]],
      codigo_postal: [null, [Validators.required]],
      codigo_siro: [null, [Validators.required]],
      codigo_suterh: [null, [Validators.required]],
      cuit: [null, [Validators.required]],
      dia_comienzo: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      id_provincia: [null, [Validators.required]],
      nombre_fantasia: [null, [Validators.required, Validators.maxLength(255)]],
      numero_verificacion_siro: [null, [Validators.required]],
      razon_social: [null, [Validators.required, Validators.maxLength(255)]],
      tipo_edificio: [null, []],
      numero: [null, [Validators.required]],
    });
  }
}
