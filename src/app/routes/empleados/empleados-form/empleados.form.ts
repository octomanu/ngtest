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
      nombre: [null, [Validators.required, Validators.maxLength(255)]],
      apellido: [null, [Validators.required, Validators.maxLength(255)]],
      dni: [null, [Validators.required, Validators.maxLength(255)]],
      cuil: [null, [Validators.required, Validators.maxLength(255)]],
      fecha_nacimiento: [null, Validators.required],
      numero_legajo: [null, [Validators.required, Validators.maxLength(255)]],
      id_estado_empleado: [1, Validators.required],
      id_consorcio: [null, Validators.required],
      id_funcion_profesional: [null, Validators.required],
      activo: [true, Validators.required],
    });
  }
}
