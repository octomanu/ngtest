import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { IngresoForm } from './ingreso.form';
import { NzMessageService, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd';
import { CajaConsorcioService } from '@core/http/caja-consorcio/caja-consorcio.service';
import { GlobalState } from 'redux/global/globa.reducer';
import { UnidadesFuncionalesService } from '@core/http/unidades-funcionales/unidades-funcionales.service';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import * as moment from 'moment';
import { LoadCajaConsorcioAction } from 'redux/caja-consorcio/caja-consorcio.actions';
import { ChequesTercerosFormComponent } from 'app/routes/cheques/cheques-terceros-form/cheques-terceros-form.component';
import { ChequesTercerosService } from '@core/http/cheques-terceros.service';

@Component({
  selector: 'app-ingreso-form',
  templateUrl: './ingreso-form.component.html',
  styles: [],
})
export class IngresoFormComponent implements OnInit, OnDestroy {
  @Input() type: string;
  form: FormGroup;
  subscripcion: Subscription;
  isLoading = false;
  timeout = null;
  consorcios: { id: number; display: string }[];
  cheques: { id: number; display: string; monto: number }[];
  ufs: { id: number; display: string }[];

  constructor(
    public store: Store<AppState>,
    public fb: IngresoForm,
    public msg: NzMessageService,
    public drawerRef: NzDrawerRef<{ submit: boolean }>,
    public cajaConsorcioService: CajaConsorcioService,
    public chequesTercerosService: ChequesTercerosService,
    public ufsService: UnidadesFuncionalesService,
    public consorciosService: ConsorciosService,
    public drawerService: NzDrawerService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.searchConsorciosList('');
    this.searchChequesTercerosList('');
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
    const ingreso = this.buildIngreso();
    if (this.type === 'ingreso') {
      this.cajaConsorcioService
        .createIngreso(ingreso)
        .subscribe((data: any) => {
          this.initForm();
          this.store.dispatch(new LoadCajaConsorcioAction());
          this.msg.success(`Creado!`);
        });
    } else {
      this.cajaConsorcioService.createEgreso(ingreso).subscribe((data: any) => {
        this.initForm();
        this.store.dispatch(new LoadCajaConsorcioAction());
        this.msg.success(`Creado!`);
      });
    }
  }

  buildIngreso() {
    const lineas: any[] = [];
    const formValue = this.form.value;
    const efectivo = formValue.efectivo ? parseFloat(formValue.efectivo) : 0;
    const transferencia = formValue.transferencia
      ? parseFloat(formValue.transferencia)
      : 0;

    let monto = efectivo + transferencia;
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

    if (formValue.id_cheque) {
      monto = monto + parseFloat(formValue.id_cheque.monto);
      const cheque: any = {
        monto: formValue.id_cheque.monto,
        metodo: 'cheque',
      };

      if (this.type === 'ingreso') {
        cheque.id_cheque_externo = formValue.id_cheque.id;
      } else {
        cheque.id_cheque = formValue.id_cheque.id;
      }

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
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string; monto: number }[]) => {
        this.isLoading = false;
        this.cheques = data;
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
