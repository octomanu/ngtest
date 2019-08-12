import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterForm } from './filter.form';
import { Subscription } from 'rxjs';
import { NzDrawerRef } from 'ng-zorro-antd';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import * as gs from 'redux/global/global.selectors';
import { ChangeFilterAction } from 'redux/cuentas-bancarias/cuentas-bancarias.actions';
import { selectFiltros } from 'redux/cuentas-bancarias/cuentas-bancarias.selectors';

@Component({
  selector: 'app-cuentas-bancarias-filter',
  templateUrl: './cuentas-bancarias-filter.component.html',
  styles: [],
})
export class CuentasBancariasFilterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  viewportSubscription: Subscription;
  stateSubscription: Subscription;

  constructor(
    public fb: FilterForm,
    public drawerRef: NzDrawerRef,
    public store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.form = this.fb.getForm();

    this.drawerRef.afterOpen.subscribe(() => {
      this.viewportSubscription = this.store
        .select(gs.smallViewport)
        .subscribe((viewport: boolean) => {
          this.drawerRef.nzWidth = viewport ? '100%' : '50%';
        });
    });

    this.stateSubscription = this.store
      .select(selectFiltros)
      .subscribe(filtros => {
        this.form.setValue({ ...filtros });
      });
  }

  submit() {
    this.store.dispatch(new ChangeFilterAction({ ...this.form.value }));
  }

  ngOnDestroy() {
    this.viewportSubscription.unsubscribe();
    this.stateSubscription.unsubscribe();
  }
}
