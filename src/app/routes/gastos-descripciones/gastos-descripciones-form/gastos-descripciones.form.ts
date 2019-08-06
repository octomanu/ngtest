import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GastosDescripcionesForm {
  constructor(private fb: FormBuilder) {}
  getForm(): FormGroup {
    return this.fb.group({
      id: [null],
      titulo: [null, Validators.required],
      descripcion: [null, Validators.required],
    });
  }
}
