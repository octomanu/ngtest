import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable, OnDestroy } from '@angular/core';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { filters } from 'redux/cabeceras/filter-form/filter-form.selectors';
import { Subscription } from 'rxjs';
@Injectable()
export class CabecerasFilterForm implements OnDestroy {
  form: FormGroup;
  storeSubscription: Subscription;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.initForm();
    this.storeSubscription = this.store.select(filters).subscribe(data => {
      if (data) this.form.setValue(data);
    });
  }

  private initForm() {
    console.log('hola');
    this.form = this.fb.group({
      cuit: [null],
      nombre: [null],
      direccion: [null],
      email: [null],
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
