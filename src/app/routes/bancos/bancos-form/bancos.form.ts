import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { CreateUpdateForm } from 'app/interfaces/local/create-update-form.interface';

@Injectable({
  providedIn: 'root',
})
export class BancosForm implements CreateUpdateForm {
  constructor(private fb: FormBuilder) {}
  getForm(): FormGroup {
    return this.fb.group({
      id: [null],
      nombre: [null, Validators.required],
      cuit: [null, Validators.required],
      alias: [null, Validators.required],
      email: [null, Validators.required],
      numero_cuenta: [null, Validators.required],
      cbu: [null, Validators.required],
      tipo_cuenta: [null, Validators.required],
      sucursal: [null, Validators.required],
      titular: [null, Validators.required],
      mostrar_datos_expensa: [null, Validators.required],
    });
  }
}
