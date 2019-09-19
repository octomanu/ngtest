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
import { NzDropdownService, NzMessageService } from 'ng-zorro-antd';
import { PaymentFormComponent } from '../../payment-form/payment-form.component';
import { GastosService } from '@core/http/gastos/gastos.service';
import { DrawerService } from '@shared/utils/drawer.service';
import { GastosFormComponent } from '../../gastos-form/gastos-form.component';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { AddDue } from 'redux/gastos/dues/dues.actions';
import { DeleteRequest } from 'redux/gastos/delete/delete.actions';
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

  protected form: FormGroup;
  constructor(
    private fb: GastosForm,
    private store: Store<AppState>,
    private nzDropdownService: NzDropdownService,
    private gastosService: GastosService,
    private msg: NzMessageService,
    protected drawerService: DrawerService,
  ) {}

  @HostListener('contextmenu', ['$event'])
  contextMenu(event: MouseEvent) {
    this.nzDropdownService.create(event, this.menu);
  }

  ngOnInit() {
    this.form = this.fb.form;
    this.setFormData();
  }

  openPaymentForm() {
    this.drawerService
      .create('global.pago_gasto', 'right', PaymentFormComponent, {
        idCuota: this.rowCuota['gastos_cuotas-id'],
        montoCuota: this.rowCuota['gastos_cuotas-monto'],
      })
      .pipe(first())
      .subscribe();
  }

  setFormData() {
    this.form.setValue({
      id: this.rowCuota['gastos_cuotas-id'],
      monto: this.rowCuota['gastos_cuotas-monto'],
      fecha_pago: this.rowCuota['gastos_cuotas-fecha_pago'],
      numero_factura: this.rowCuota['facturas_proveedor-numero_factura'],
    });
  }

  submit() {
    if (this.form.invalid) return;
    const formValue = this.fb.resolve();
    this.store.dispatch(new AddDue({ due: formValue }));
  }

  openForm() {
    const submitForm = new Subject<{ submit: boolean }>();
    this.drawerService
      .create('lambe.gasto', 'right', GastosFormComponent, {
        id: this.rowCuota['gastos-id'],
        valueChange: submitForm,
      })
      .pipe(first())
      .subscribe();
  }
  delete() {
    this.store.dispatch(new DeleteRequest({ id: this.rowCuota['gastos-id'] }));
  }
}
