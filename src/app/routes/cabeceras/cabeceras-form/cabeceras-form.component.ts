import { Component, OnInit, OnDestroy } from '@angular/core';
import { CabecerasForm } from './cabeceras.form';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { formLoading } from 'redux/cabeceras/cabeceras.selectors';
import {
  CabecerasUpdateRequest,
  CloseEditForm,
} from 'redux/cabeceras/edit-form/edit-form.actions';
import { SaveRequest } from 'redux/cabeceras/create-form/create-form.actions';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cabeceras-form',
  templateUrl: './cabeceras-form.component.html',
  styles: [],
  providers: [CabecerasForm],
})
export class CabecerasFormComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  constructor(private store: Store<AppState>, public fb: CabecerasForm) {}

  ngOnInit() {
    this.loading$ = this.store.select(formLoading).pipe(
      tap(loading => {
        if (loading) this.fb.form.disable();
        else this.fb.form.enable();
      }),
    );
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
    this.store.dispatch(new CloseEditForm());
  }
}
