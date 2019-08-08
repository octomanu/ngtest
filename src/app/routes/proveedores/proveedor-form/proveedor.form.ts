import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProveedorForm {
  constructor(private fb: FormBuilder) {}
  getForm() {
    return this.fb.group({
      id: [null, []],
      razon_social: [null, [Validators.required]],
      nombre_fantasia: [null, [Validators.required]],
      direccion: [null, [Validators.required]],
      localidad: [null, [Validators.required]],
      id_provincia: [null, [Validators.required]],
      codigo_postal: [null, [Validators.required]],
      cuit: [null, [Validators.required]],
      nota: [null, []],
      matricula: [null, []],
      horario_atencion: [null, []],
      situacion_fiscal: [null, []],
    });
  }
}
