import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { CategoriasForm } from './categorias.form';
import { tap } from 'rxjs/operators';
import { formLoading } from 'redux/categorias/categorias.selectors';
import {
  CategoriasUpdateRequest,
  CloseEditForm,
} from 'redux/categorias/edit-form/edit-form.actions';
import { SaveRequest } from 'redux/categorias/create-form/create-form.actions';

@Component({
  selector: 'app-categorias-form',
  templateUrl: './categorias-form.component.html',
  styles: [],
  providers: [CategoriasForm],
})
export class CategoriasFormComponent implements OnInit {
  loading$: Observable<boolean>;
  constructor(private store: Store<AppState>, public fb: CategoriasForm) {}

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
      this.store.dispatch(new CategoriasUpdateRequest({ data: formData }));
    } else {
      this.store.dispatch(new SaveRequest({ data: formData }));
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new CloseEditForm());
  }
}
