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
      razon_social: [null, [Validators.required, Validators.maxLength(255)]],
      nombre_fantasia: [null, [Validators.required, Validators.maxLength(255)]],
      direccion: [null, [Validators.required, Validators.maxLength(255)]],
      localidad: [null, [Validators.required, Validators.maxLength(255)]],
      id_provincia: [null, [Validators.required]],
      codigo_postal: [null, [Validators.required, Validators.maxLength(255)]],
      cuit: [null, [Validators.required, Validators.maxLength(255)]],
      nota: [null, []],
      matricula: [null, [Validators.maxLength(255)]],
      horario_atencion: [null, [Validators.maxLength(255)]],
      situacion_fiscal: [null, []],
    });
  }
}
