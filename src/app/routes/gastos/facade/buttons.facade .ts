import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { selectHelp, selectKeepHelp } from 'redux/global/global.selectors';
import { haveDues, loading } from 'redux/gastos/dues/dues.selectors';
import { Observable, combineLatest } from 'rxjs';
import { share, map } from 'rxjs/operators';
import {
  FilterRequest,
  OpenFilterForm,
} from 'redux/gastos/filter-form/filter-form.actions';
import { OpenCreateForm } from 'redux/gastos/create-form/create-form.actions';
import { DueSaveRequest } from 'redux/gastos/dues/dues.actions';
@Injectable()
export class ButtonsFacade {
  keepHelp: Observable<boolean>;
  help: Observable<boolean>;
  showHelp: Observable<boolean>;
  haveDues: Observable<boolean>;
  savingDues: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.haveDues = this.store.select(haveDues);
    this.savingDues = this.store.select(loading);
    this.help = this.store.select(selectHelp);
    this.keepHelp = this.store.select(selectKeepHelp).pipe(share());
    this.showHelp = combineLatest([this.help, this.keepHelp]).pipe(
      map(result => (result[0] || result[1] ? true : false)),
      share(),
    );
  }

  clearFilter() {
    this.store.dispatch(new FilterRequest({ data: null }));
  }

  openFilter() {
    this.store.dispatch(new OpenFilterForm());
  }

  create() {
    this.store.dispatch(new OpenCreateForm());
  }

  saveDues() {
    this.store.dispatch(new DueSaveRequest());
  }
}
