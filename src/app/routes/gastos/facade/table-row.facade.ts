import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { DeleteRequest } from 'redux/gastos/delete/delete.actions';
import { GastosEditRequest } from 'redux/gastos/edit-form/edit-form.actions';
import { PaymentRequest } from 'redux/gastos/payment-form/payment-form.actions';
import { NzDropdownMenuComponent, NzContextMenuService } from 'ng-zorro-antd';
import { AddDue } from 'redux/gastos/dues/dues.actions';
import { Observable } from 'rxjs';
import {
  consorcioVisible,
  proveedorVisible,
  servicioVisible,
} from 'redux/gastos/filter-form/filter-form.selectors';

@Injectable()
export class TableRowFacade {
  consorcioVisible: Observable<any>;
  proveedorVisible: Observable<any>;
  servicioVisible: Observable<any>;
  constructor(
    private store: Store<AppState>,
    private nzContextMenuService: NzContextMenuService,
  ) {
    this.consorcioVisible = this.store.select(consorcioVisible);
    this.proveedorVisible = this.store.select(proveedorVisible);
    this.servicioVisible = this.store.select(servicioVisible);
  }

  openMenu(event: MouseEvent, template: NzDropdownMenuComponent) {
    this.nzContextMenuService.create(event, template);
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
