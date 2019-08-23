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
import { ChequesTercerosService } from '@core/http/cheques-terceros.service';
import { ChequesTercerosFormComponent } from 'app/routes/cheques/cheques-terceros-form/cheques-terceros-form.component';
import { ChequesService } from '@core/http/cheques/cheques.service';
@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styles: [],
})
export class PaymentFormComponent implements OnInit, OnDestroy {
  @Input() idCuota;
  @Input() montoCuota;
  acumulado = 0;
  form: FormGroup;
  isLoading = false;
  timeout = null;
  chequesTerceros: { id: number; display: string; monto: number }[];
  cheques: { id: number; display: string; monto: number }[];
  subscripcion: Subscription;

  constructor(
    protected store: Store<AppState>,
    protected fb: PaymentForm,
    protected msg: NzMessageService,
    protected drawerRef: NzDrawerRef<{ submit: boolean }>,
    protected drawerService: NzDrawerService,
    protected gastosCuotasService: GastosCuotasService,
    protected chequesTercerosService: ChequesTercerosService,
    protected chequesService: ChequesService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.searchChequesTercerosList('');
    this.searchChequesList('');
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
    console.log(pago);
    this.gastosCuotasService.pagarCuota(this.idCuota, pago).subscribe(resp => {
      this.msg.success('Pago cargado correctamente');
      this.drawerRef.close();
    });
  }

  buildPayment(formValue) {
    const lineas: any[] = [];
    const efectivo = formValue.efectivo ? parseFloat(formValue.efectivo) : 0;
    const transferencia = formValue.transferencia
      ? parseFloat(formValue.transferencia)
      : 0;

    const id_cheque_externo = formValue.id_cheque_tercero
      ? formValue.id_cheque_tercero.id
      : null;
    const id_cheque = formValue.id_cheque ? formValue.id_cheque.id : null;

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

    return {
      fecha: moment(formValue.fecha).format('DD-MM-YYYY'),
      descripcion: formValue.descripcion,
      id_cheque,
      id_cheque_externo,
      lineas,
    };
  }

  openChequeForm() {
    const drawerConfigForm = this.drawerService.create({
      nzTitle: 'global cheque',
      nzContent: ChequesTercerosFormComponent,
    });
  }

  searchChequesTerceros(display: string) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.isLoading = true;
      this.searchChequesTercerosList(display);
    }, 400);
  }

  searchCheques(display: string) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.isLoading = true;
      this.searchChequesList(display);
    }, 400);
  }

  protected searchChequesTercerosList(display: string) {
    this.chequesTercerosService
      .searchByDisplayForEgreso(display)
      .subscribe((data: { id: number; display: string; monto: number }[]) => {
        this.isLoading = false;
        this.chequesTerceros = data;
      });
  }

  protected searchChequesList(display: string) {
    this.chequesService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string; monto: number }[]) => {
        this.isLoading = false;
        this.cheques = data;
      });
  }

  sumAcumulado(event) {
    if (
      this.form.get('efectivo').invalid ||
      this.form.get('transferencia').invalid
    ) {
      return;
    }
    const efectivo = this.form.value.efectivo
      ? parseFloat(this.form.value.efectivo)
      : 0;
    const transferencia = this.form.value.transferencia
      ? parseFloat(this.form.value.transferencia)
      : 0;
    const cheque = this.form.value.id_cheque
      ? parseFloat(this.form.value.id_cheque.monto)
      : 0;
    const chequeTercero = this.form.value.id_cheque_tercero
      ? parseFloat(this.form.value.id_cheque_tercero.monto)
      : 0;

    this.acumulado = efectivo + transferencia + cheque + chequeTercero;

    this.acumulado = parseFloat(this.acumulado.toFixed(2));
  }
}
