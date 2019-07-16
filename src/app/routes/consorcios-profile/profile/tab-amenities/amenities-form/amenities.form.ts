import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AmenitiesForm {
  constructor(private fb: FormBuilder) {}
  getForm() {
    return this.fb.group({
      id: [null, []],
      nombre: [null, [Validators.required]],
      ubicacion: [null, [Validators.required]],
      habilitada: [true, [Validators.required]],
    });
  }
}
