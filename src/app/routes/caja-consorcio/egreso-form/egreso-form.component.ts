import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppState } from 'redux/app.reducer';
import { EgresoForm } from './egreso.form';
import { NzMessageService, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import { CajaConsorcioService } from '@core/http/caja-consorcio/caja-consorcio.service';
import { ChequesTercerosService } from '@core/http/cheques-terceros.service';
import { UnidadesFuncionalesService } from '@core/http/unidades-funcionales/unidades-funcionales.service';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { GlobalState } from 'redux/global/globa.reducer';
import { LoadCajaConsorcioAction } from 'redux/caja-consorcio/caja-consorcio.actions';
import { ChequesTercerosFormComponent } from 'app/routes/cheques/cheques-terceros-form/cheques-terceros-form.component';
import * as moment from 'moment';
import { ChequesService } from '@core/http/cheques/cheques.service';

@Component({
  selector: 'app-egreso-form',
  templateUrl: './egreso-form.component.html',
  styles: [],
})
export class EgresoFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscripcion: Subscription;
  isLoading = false;
  timeout = null;
  consorcios: { id: number; display: string }[];
  chequesTerceros: { id: number; display: string; monto: number }[];
  cheques: { id: number; display: string; monto: number }[];
  ufs: { id: number; display: string }[];

  constructor(
    public store: Store<AppState>,
    public fb: EgresoForm,
    public msg: NzMessageService,
    public drawerRef: NzDrawerRef<{ submit: boolean }>,
    public cajaConsorcioService: CajaConsorcioService,
    public chequesTercerosService: ChequesTercerosService,
    public ufsService: UnidadesFuncionalesService,
    public consorciosService: ConsorciosService,
    protected chequesService: ChequesService,
    public drawerService: NzDrawerService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.searchConsorciosList('');
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
    const egreso = this.buildIngreso();
    this.cajaConsorcioService.createEgreso(egreso).subscribe((data: any) => {
      this.initForm();
      this.searchChequesTercerosList('');
      this.store.dispatch(new LoadCajaConsorcioAction());
      this.msg.success(`Creado!`);
    });
  }

  buildIngreso() {
    const lineas: any[] = [];
    const formValue = this.form.value;
    let monto = 0;

    if (formValue.efectivo) {
      monto = monto + parseFloat(formValue.efectivo);
      lineas.push({
        monto: parseFloat(formValue.efectivo),
        metodo: 'efectivo',
      });
    }

    if (formValue.transferencia) {
      monto = monto + parseFloat(formValue.transferencia);
      lineas.push({
        monto: parseFloat(formValue.transferencia),
        metodo: 'transferencia',
      });
    }

    if (formValue.id_cheque) {
      monto = monto + parseFloat(formValue.id_cheque.monto);
      const cheque: any = {
        monto: formValue.id_cheque.monto,
        metodo: 'cheque',
        id_cheque: formValue.id_cheque.id,
      };

      lineas.push(cheque);
    }

    if (formValue.id_cheque_externo) {
      monto = monto + parseFloat(formValue.id_cheque_externo.monto);
      const cheque: any = {
        monto: formValue.id_cheque_externo.monto,
        metodo: 'cheque',
        id_cheque_externo: formValue.id_cheque_externo.id,
      };

      lineas.push(cheque);
    }

    const ingreso = {
      fecha: moment(formValue.fecha).format('DD-MM-YYYY'),
      descripcion: formValue.descripcion,
      monto: parseFloat(monto.toFixed(2)),
      id_consorcio: formValue.id_consorcio,
      lineas,
    };

    if (formValue.id_unidad_funcional) {
      return {
        ...ingreso,
        id_unidad_funcional: formValue.id_unidad_funcional,
      };
    }

    return ingreso;
  }

  openChequeForm() {
    const drawerConfigForm = this.drawerService.create({
      nzTitle: 'global.cheque',
      nzContent: ChequesTercerosFormComponent,
    });
  }

  changeConsorcio() {
    const idConsorcio = this.form.get('id_consorcio').value;
    this.ufsService.setConsorcio(idConsorcio);
    this.form.get('id_unidad_funcional').setValue(null);
    this.searchUfsList('');
  }

  searchUfs(display: string) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.isLoading = true;
      this.searchUfsList(display);
    }, 400);
  }

  searchConsorcios(display: string) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.isLoading = true;
      this.searchConsorciosList(display);
    }, 400);
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

  protected searchChequesList(display: string) {
    this.chequesService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string; monto: number }[]) => {
        this.isLoading = false;
        this.cheques = data;
      });
  }

  protected searchConsorciosList(display: string) {
    this.consorciosService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.consorcios = data;
      });
  }

  protected searchChequesTercerosList(display: string) {
    this.chequesTercerosService
      .searchByDisplayForEgreso(display)
      .subscribe((data: { id: number; display: string; monto: number }[]) => {
        this.isLoading = false;
        this.chequesTerceros = data;
      });
  }

  protected searchUfsList(display: string) {
    this.ufsService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.ufs = data;
      });
  }
}
