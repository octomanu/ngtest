import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { CreateUpdateForm } from 'app/interfaces/local/create-update-form.interface';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosForm implements CreateUpdateForm {
  constructor(private fb: FormBuilder) {}
  getForm(): FormGroup {
    return this.fb.group({
      id: [null],
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      dni: [null, Validators.required],
      cuil: [null, Validators.required],
      fecha_nacimiento: [null, Validators.required],
      numero_legajo: [null, Validators.required],
      id_estado_empleado: [1, Validators.required],
      id_consorcio: [null, Validators.required],
      id_funcion_profesional: [null, Validators.required],
      activo: [true, Validators.required],
    });
  }
}
