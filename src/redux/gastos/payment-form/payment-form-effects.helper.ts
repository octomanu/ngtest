import { Injectable } from '@angular/core';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { tap } from 'rxjs/operators';
import { DrawerService } from '@shared/utils/drawer.service';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { GastosCuotasService } from '@core/http/gastos-cuotas/gastos-cuotas.service';
import { PaymentFormComponent } from 'app/routes/gastos/payment-form/payment-form.component';
import { paymentId } from './payment-form.selectors';
@Injectable()
export class PaymentFormEffectsHelper {
  private paymentDrawerRef: NzDrawerRef;
  constructor(
    private store: Store<AppState>,
    protected gastosCuotasService: GastosCuotasService,
    protected msg: NzMessageService,
    protected drawerService: DrawerService,
  ) {}

  openPaymentForm() {
    return this.drawerService
      .create('global.servicios', 'right', PaymentFormComponent)
      .pipe(tap(ref => (this.paymentDrawerRef = ref)));
  }

  saveData(data) {
    return this.gastosCuotasService
      .pagarCuota(this.store.select(paymentId), data)
      .pipe(
        tap(() => {
          this.msg.success(`global.pagado`);
          this.paymentDrawerRef.close();
        }),
      );
  }
}
