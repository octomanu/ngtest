import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable, OnDestroy } from '@angular/core';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filters } from 'redux/gastos/filter-form/filter-form.selectors';
@Injectable()
export class GastosTableFilterForm implements OnDestroy {
  form: FormGroup;
  storeSubscription: Subscription;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.initForm();
    this.storeSubscription = this.store.select(filters).subscribe(data => {
      if (data) this.form.setValue(data);
    });
  }

  private initForm() {
    this.form = this.fb.group({
      proveedor: [null],
      consorcio: [null],
      servicio: [null],
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
