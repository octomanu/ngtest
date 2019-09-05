import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { editFormData } from 'redux/cabeceras/cabeceras.selectors';
import { createFormData } from 'redux/cabeceras/create-form/create-form.selectors';

@Injectable({
  providedIn: 'root',
})
export class CabecerasForm {
  form: FormGroup;
  constructor(private store: Store<AppState>, private fb: FormBuilder) {

    this.store.select(editFormData).subscribe(data => {
      if (data) this.form.setValue(data);
      else this.initForm();
    });

    this.store.select(createFormData).subscribe(data => {
      this.initForm();
      if (data) this.form.setValue(data);
    });
  }

  private initForm() {
    this.form = this.fb.group({
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
