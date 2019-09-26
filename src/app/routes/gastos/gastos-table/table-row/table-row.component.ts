import {
  Component,
  OnInit,
  Input,
  HostListener,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GastosRowForm } from '../../forms/gastos-row.form';
import { TableRowFacade } from '../../facade/table-row.facade';
import { NzDropdownMenuComponent } from 'ng-zorro-antd';
@Component({
  selector: '[gastos-row]',
  templateUrl: './table-row.component.html',
  styles: [],
  providers: [GastosRowForm],
})
export class TableRowComponent implements OnInit {
  @Input() rowCuota: any;
  @Input() extraData: boolean;
  @ViewChild('menuRow', { static: false }) menu: NzDropdownMenuComponent;
  protected form: FormGroup;
  constructor(private fb: GastosRowForm, public row: TableRowFacade) {}

  @HostListener('contextmenu', ['$event'])
  contextMenu(event: MouseEvent) {
    this.row.openMenu(event, this.menu);
  }

  ngOnInit() {
    this.form = this.fb.form;
    this.setFormData();
  }

  openPaymentForm() {
    this.row.pay(
      this.rowCuota['gastos_cuotas-id'],
      this.rowCuota['gastos_cuotas-monto'],
    );
  }

  submit() {
    if (this.form.invalid) return;
    this.row.addDue(this.fb.resolve());
  }

  openForm() {
    this.row.edit(this.rowCuota['gastos-id']);
  }

  delete() {
    this.row.delete(this.rowCuota['gastos-id']);
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
