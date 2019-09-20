import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GastosForm } from '../gastos.form';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { NzDropdownService } from 'ng-zorro-antd';
import { DrawerService } from '@shared/utils/drawer.service';
import { AddDue } from 'redux/gastos/dues/dues.actions';
import { DeleteRequest } from 'redux/gastos/delete/delete.actions';
import { PaymentRequest } from 'redux/gastos/payment-form/payment-form.actions';
import * as selectors from 'redux/gastos/page/page.selectors';
import { GastosEditRequest } from 'redux/gastos/edit-form/edit-form.actions';
import { Observable } from 'rxjs';
@Component({
  selector: '[gastos-row]',
  templateUrl: './table-row.component.html',
  styles: [],
  providers: [GastosForm],
})
export class TableRowComponent implements OnInit {
  @Input() rowCuota: any;
  @Input() extraData: boolean;
  @ViewChild('menuRow', { static: false }) menu: TemplateRef<void>;
  consorcioVisible$: Observable<boolean>;
  proveedorVisible$: Observable<boolean>;
  servicioVisible$: Observable<boolean>;
  protected form: FormGroup;
  constructor(
    private fb: GastosForm,
    private store: Store<AppState>,
    private nzDropdownService: NzDropdownService,
    protected drawerService: DrawerService,
  ) {}

  @HostListener('contextmenu', ['$event'])
  contextMenu(event: MouseEvent) {
    this.nzDropdownService.create(event, this.menu);
  }

  ngOnInit() {
    this.form = this.fb.form;
    this.setFormData();
    this.consorcioVisible$ = this.store.select(selectors.consorcioVisible);
    this.proveedorVisible$ = this.store.select(selectors.proveedorVisible);
    this.servicioVisible$ = this.store.select(selectors.servicioVisible);
  }

  openPaymentForm() {
    this.store.dispatch(
      new PaymentRequest({
        id: this.rowCuota['gastos_cuotas-id'],
        amount: this.rowCuota['gastos_cuotas-monto'],
      }),
    );
  }

  submit() {
    if (this.form.invalid) return;
    const formValue = this.fb.resolve();
    this.store.dispatch(new AddDue({ due: formValue }));
  }

  openForm() {
    this.store.dispatch(
      new GastosEditRequest({ id: this.rowCuota['gastos-id'] }),
    );
  }

  delete() {
    this.store.dispatch(new DeleteRequest({ id: this.rowCuota['gastos-id'] }));
  }

  setFormData() {
    this.form.setValue({
      id: this.rowCuota['gastos_cuotas-id'],
      monto: this.rowCuota['gastos_cuotas-monto'],
      fecha_pago: this.rowCuota['gastos_cuotas-fecha_pago'],
      numero_factura: this.rowCuota['facturas_proveedor-numero_factura'],
    });
  }
}
