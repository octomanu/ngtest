import { Component } from '@angular/core';
import { OrdenesPagoFormComponent } from './ordenes-pago-form/ordenes-pago-form.component';
import { WrapComponent } from '../classes/WrapComponent.class';
import { PaymentFormComponent } from '../gastos/payment-form/payment-form.component';

@Component({
  selector: 'app-ordenes-pago',
  templateUrl: './ordenes-pago.component.html',
  styles: [],
})
export class OrdenesPagoComponent extends WrapComponent {
  drawerTitle = 'global.ordenes_pago';
  drawerContent = OrdenesPagoFormComponent;

  openPaymentForm(id?: number) {
    this.translate.get(this.drawerTitle).subscribe((res: string) => {
      this.drawerService.create({
        nzTitle: res,
        nzWidth: this.smallViewport ? '100%' : '75%',
        nzContent: PaymentFormComponent,
        nzPlacement: 'right',
        nzContentParams: { id },
      });
    });
  }
}
