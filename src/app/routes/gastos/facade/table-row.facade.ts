import { Injectable, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import * as selectors from 'redux/gastos/page/page.selectors';
import { DeleteRequest } from 'redux/gastos/delete/delete.actions';
import { GastosEditRequest } from 'redux/gastos/edit-form/edit-form.actions';
import { PaymentRequest } from 'redux/gastos/payment-form/payment-form.actions';
import { NzDropdownService } from 'ng-zorro-antd';
import { AddDue } from 'redux/gastos/dues/dues.actions';
import { Observable } from 'rxjs';

@Injectable()
export class TableRowFacade {
  consorcioVisible: Observable<any>;
  proveedorVisible: Observable<any>;
  servicioVisible: Observable<any>;
  constructor(
    private store: Store<AppState>,
    private nzDropdownService: NzDropdownService,
  ) {
    this.consorcioVisible = this.store.select(selectors.consorcioVisible);
    this.proveedorVisible = this.store.select(selectors.proveedorVisible);
    this.servicioVisible = this.store.select(selectors.servicioVisible);
  }

  openMenu(event: MouseEvent, menu: TemplateRef<void>) {
    this.nzDropdownService.create(event, menu);
  }

  addDue(due: any) {
    this.store.dispatch(new AddDue({ due }));
  }

  edit(id: number) {
    this.store.dispatch(new GastosEditRequest({ id }));
  }

  delete(id: number) {
    this.store.dispatch(new DeleteRequest({ id }));
  }

  pay(id: number, amount: string) {
    this.store.dispatch(
      new PaymentRequest({
        id,
        amount,
      }),
    );
  }
}
