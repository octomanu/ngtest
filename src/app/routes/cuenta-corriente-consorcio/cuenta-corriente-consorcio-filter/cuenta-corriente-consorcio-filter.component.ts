import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CuentaCorrienteConsorcioFilterForm } from './cuenta-corriente-consorcio-filter.form';
import { NzDrawerRef } from 'ng-zorro-antd';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { smallViewport } from 'redux/global/global.selectors';
import { selectFiltros } from 'redux/cuenta-corriente-consorcio/cuenta-corriente-consorcio.selectors';
import { ChangeFilterAction } from 'redux/cuenta-corriente-consorcio/cuenta-corriente-consorcio.actions';

@Component({
  selector: 'app-cuenta-corriente-consorcio-filter',
  templateUrl: './cuenta-corriente-consorcio-filter.component.html',
  styles: [],
})
export class CuentaCorrienteConsorcioFilterComponent
  implements OnInit, OnDestroy {
  form: FormGroup;
  viewportSubscription: Subscription;
  stateSubscription: Subscription;

  constructor(
    public fb: CuentaCorrienteConsorcioFilterForm,
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
    this.drawerRef.close();
  }

  ngOnDestroy() {
    this.viewportSubscription.unsubscribe();
    this.stateSubscription.unsubscribe();
  }
}
