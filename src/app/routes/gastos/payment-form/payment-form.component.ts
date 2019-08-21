import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { PaymentForm } from './payment.form';
import { NzMessageService, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd';
import { Subscription, Subject } from 'rxjs';
import { GlobalState } from 'redux/global/globa.reducer';
import { FormGroup } from '@angular/forms';
import { GastosCuotasService } from '@core/http/gastos-cuotas/gastos-cuotas.service';
import * as moment from 'moment';
@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styles: [],
})
export class PaymentFormComponent implements OnInit, OnDestroy {
  @Input() idCuota;
  @Input() montoCuota;
  form: FormGroup;
  isLoading = false;
  timeout = null;
  cheques: { id: number; display: string; monto: number }[];
  subscripcion: Subscription;

  constructor(
    public store: Store<AppState>,
    public fb: PaymentForm,
    public msg: NzMessageService,
    public drawerRef: NzDrawerRef<{ submit: boolean }>,
    public drawerService: NzDrawerService,
    public gastosCuotasService: GastosCuotasService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.drawerRef.afterOpen.subscribe(() => {
      this.subscripcion = this.store
        .select('globalState')
        .subscribe((state: GlobalState) => {
          this.drawerRef.nzWidth = state.smallViewport ? '100%' : '75%';
        });
    });
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  initForm() {
    this.form = this.fb.getForm();
  }

  submit() {
    const pago = this.buildPayment(this.form.value);
    this.gastosCuotasService.pagarCuota(this.idCuota, pago).subscribe(resp => {
      this.msg.success('Pago cargado correctamente');
      this.drawerRef.close();
    });
  }

  buildPayment(formValue) {
    const lineas: any[] = [];
    const efectivo = formValue.efectivo ? parseFloat(formValue.efectivo) : 0;
    const transferencia = formValue.transferencia
      ? parseInt(formValue.transferencia)
      : 0;

    lineas.push(
      {
        monto: efectivo,
        metodo: 'efectivo',
      },
      {
        monto: transferencia,
        metodo: 'transferencia',
      },
    );

    // if (formValue.id_cheque) {
    //   lineas.push({
    //     monto: formValue.id_cheque.monto,
    //     metodo: 'cheque',
    //     id_cheque_externo: formValue.id_cheque.id,
    //   });
    // }

    return {
      fecha: moment(formValue.fecha).format('DD-MM-YYYY'),
      descripcion: formValue.descripcion,
      lineas,
    };
  }
}
