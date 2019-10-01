import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable, OnDestroy } from '@angular/core';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { createFormData } from 'redux/juicios/create-form/create-form.selectors';
import { editFormData } from 'redux/juicios/edit-form/edit-form.selectors';
import { Subscription } from 'rxjs';

@Injectable()
export class JuiciosForm implements OnDestroy {
  form: FormGroup;
  editFormSubs: Subscription;
  createFormSubs: Subscription;
  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.editFormSubs = this.store.select(editFormData).subscribe(data => {
      if (data) this.form.setValue(data);
      else this.initForm();
    });

    this.createFormSubs = this.store.select(createFormData).subscribe(data => {
      this.initForm();
      if (data) this.form.setValue(data);
    });
  }

  private initForm() {
    this.form = this.fb.group({
      id: [null],
      id_consorcio: [null, Validators.required],
      caratula: [null, Validators.required],
      numero_expediente: [null, [Validators.required]],
      juzgado: [null, [Validators.required]],
      objeto: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      monto_reclamado: [
        null,
        [
          Validators.required,
          Validators.pattern('-?[0-9]{1,8}(?:.[0-9]{1,2})?'),
        ],
      ],
      activo: [true, [Validators.required]],
    });
  }

  ngOnDestroy() {
    this.createFormSubs.unsubscribe();
    this.editFormSubs.unsubscribe();
  }
}
