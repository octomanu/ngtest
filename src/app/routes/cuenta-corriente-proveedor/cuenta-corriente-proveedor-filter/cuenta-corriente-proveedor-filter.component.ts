import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NzDrawerRef } from 'ng-zorro-antd';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { ChangeFilterAction } from 'redux/cuenta-corriente-proveedor/cuenta-corriente-proveedor.actions';
import { smallViewport } from 'redux/global/global.selectors';
import { CuentaCorrienteProveedorFilterForm } from './cuenta-corriente-proveedor-filter.form';
import { selectFiltros } from 'redux/cuenta-corriente-proveedor/cuenta-corriente-proveedor.selector';

@Component({
  selector: 'app-cuenta-corriente-proveedor-filter',
  templateUrl: './cuenta-corriente-proveedor-filter.component.html',
  styles: [],
})
export class CuentaCorrienteProveedorFilterComponent
  implements OnInit, OnDestroy {
  form: FormGroup;
  viewportSubscription: Subscription;
  stateSubscription: Subscription;

  constructor(
    public fb: CuentaCorrienteProveedorFilterForm,
    public drawerRef: NzDrawerRef,
    public store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.form = this.fb.getForm();

    this.drawerRef.afterOpen.subscribe(() => {
      this.viewportSubscription = this.store
        .select(smallViewport)
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
