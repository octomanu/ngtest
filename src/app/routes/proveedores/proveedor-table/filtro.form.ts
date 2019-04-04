import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FiltroForm {
  constructor(private fb: FormBuilder) {}
  getForm() {
    return this.fb.group({
      razon_social: [null, []],
      direccion: [null, []],
      cuit: [null, []],
    });
  }
}
