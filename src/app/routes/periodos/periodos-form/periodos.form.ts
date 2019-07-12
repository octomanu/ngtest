import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { CreateUpdateForm } from 'app/interfaces/local/create-update-form.interface';

@Injectable({
  providedIn: 'root',
})
export class PeriodosForm implements CreateUpdateForm {
  constructor(private fb: FormBuilder) {}
  getForm(): FormGroup {
    return this.fb.group({
      id: [null],
      id_consorcio: [null, Validators.required],
      descripcion: [null, Validators.required],
      fecha_inicio: [null, Validators.required],
      fecha_cierre: [null, Validators.required],
      estado: [null, Validators.required],
    });
  }
}
