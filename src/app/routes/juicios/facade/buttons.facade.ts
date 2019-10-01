import { Injectable } from '@angular/core';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import {
  FilterRequest,
  OpenFilterForm,
} from 'redux/juicios/filter-form/filter-form.actions';
import { selectHelp, selectKeepHelp } from 'redux/global/global.selectors';
import { OpenCreateForm } from 'redux/juicios/create-form/create-form.actions';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable()
export class ButtonsFacade {
  help$: Observable<boolean>;
  keepHelp$: Observable<boolean>;
  constructor(private store: Store<AppState>) {
    this.initObservable();
  }

  initObservable() {
    this.help$ = this.store.select(selectHelp).pipe(share());
    this.keepHelp$ = this.store.select(selectKeepHelp).pipe(share());
  }

  openFilterForm() {
    this.store.dispatch(new OpenFilterForm());
  }

  openCreateForm() {
    this.store.dispatch(new OpenCreateForm());
  }

  clearFilter() {
    this.store.dispatch(new FilterRequest({ data: null }));
  }
}
