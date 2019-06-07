import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CabecerasForm {
  constructor(private fb: FormBuilder) {}
  getForm(): FormGroup {
    return this.fb.group({
      id: [null],
      cuit: [null, Validators.required],
      nombre: [null, Validators.required],
      direccion: [null, Validators.required],
      email: [null, [Validators.required]],
      telefono: [null, [Validators.required]],
      situacion_fiscal: [null, [Validators.required]],
      codigo_postal: [null, [Validators.required]],
      rpa: [null, [Validators.required]],
    });
  }
}
