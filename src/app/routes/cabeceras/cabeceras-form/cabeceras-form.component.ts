import { Component, OnInit, OnDestroy } from '@angular/core';
import { CabecerasForm } from './cabeceras.form';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { formLoading } from 'redux/cabeceras/cabeceras.selectors';
import { CabecerasUpdateRequest } from 'redux/cabeceras/edit-form/edit-form.actions';
import { SaveRequest } from 'redux/cabeceras/create-form/create-form.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cabeceras-form',
  templateUrl: './cabeceras-form.component.html',
  styles: [],
})
export class CabecerasFormComponent implements OnInit, OnDestroy {
  loading: boolean;
  subscription: Subscription;
  constructor(private store: Store<AppState>, public fb: CabecerasForm) {}

  ngOnInit() {
    this.subscription = this.store.select(formLoading).subscribe(loading => {
      this.loading = loading;
      if (loading) this.fb.form.disable();
      else this.fb.form.enable();
    });
  }

  submit() {
    const formData = this.fb.form.value;
    if (formData.id) {
      this.store.dispatch(new CabecerasUpdateRequest({ data: formData }));
    } else {
      this.store.dispatch(new SaveRequest({ data: formData }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
