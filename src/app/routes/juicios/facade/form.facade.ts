import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { JuiciosForm } from '../juicios-form/juicios.form';
import { ConsorciosFinderService } from 'app/routes/services/type-ahead/consorcios-finder/consorcios-finder.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { formLoading } from 'redux/juicios/juicios.selectors';
import {
  CloseEditForm,
  JuiciosUpdateRequest,
} from 'redux/juicios/edit-form/edit-form.actions';
import { SaveRequest } from 'redux/juicios/create-form/create-form.actions';

@Injectable()
export class FormFacade {
  submiting: Observable<boolean>;

  get form() {
    console.log('form');
    return this.fb.form;
  }

  get valid() {
    console.log('valid');
    return this.fb.form.valid;
  }

  get consorcios() {
    console.log('consorcios');
    return this.consorcioSelect.consorcios;
  }

  get loading() {
    console.log('loading');
    //ve si se quita el isloading y en vez de llamar al next is loading true. y vaciar el array. asi no emito esa vaina
    return this.consorcioSelect.isLoading;
  }

  constructor(
    private store: Store<AppState>,
    private fb: JuiciosForm,
    private consorcioSelect: ConsorciosFinderService,
  ) {
    this.initObservables();
  }

  initObservables() {
    console.log('initObservables');
    this.submiting = this.store.select(formLoading).pipe(
      tap(loading => {
        if (loading) this.fb.form.disable();
        else this.fb.form.enable();
      }),
    );
  }

  searchConsorcios(display: string) {
    console.log('searchConsorcios');
    this.consorcioSelect.searchConsorcios(display);
  }

  submit() {
    console.log('submit');
    const formData = this.fb.form.value;
    if (formData.id) {
      this.store.dispatch(new JuiciosUpdateRequest({ data: formData }));
    } else {
      this.store.dispatch(new SaveRequest({ data: formData }));
    }
  }

  close() {
    console.log('close');
    this.store.dispatch(new CloseEditForm());
  }
}
