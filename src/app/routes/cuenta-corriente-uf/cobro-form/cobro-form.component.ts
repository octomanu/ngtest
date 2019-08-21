import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { CobroForm } from './cobro.form';
import { NzMessageService, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd';
import { ChequesTercerosService } from '@core/http/cheques-terceros.service';
import { GlobalState } from 'redux/global/globa.reducer';
import * as moment from 'moment';
import { ChequesTercerosFormComponent } from 'app/routes/cheques/cheques-terceros-form/cheques-terceros-form.component';
import { CuentaCorrienteUfService } from '@core/http/cuenta-corriente-uf/cuenta-corriente-uf.service';
import { LoadCuentaCorrienteUfAction } from 'redux/cuenta-corriente-uf/cuenta-corriente-uf-actions';
@Component({
  selector: 'app-cobro-form',
  templateUrl: './cobro-form.component.html',
  styles: [],
})
export class CobroFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscripcion: Subscription;
  isLoading = false;
  timeout = null;
  cheques: { id: number; display: string; monto: number }[];
  constructor(
    public store: Store<AppState>,
    public fb: CobroForm,
    public msg: NzMessageService,
    public drawerRef: NzDrawerRef<{ submit: boolean }>,
    public chequesTercerosService: ChequesTercerosService,
    public drawerService: NzDrawerService,
    public cuentaCorrienteUf: CuentaCorrienteUfService,
  ) {}

  ngOnInit() {
    this.initForm();
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
    const formData = { ...this.form.value };
    formData.fecha = moment(formData.fecha).format('DD-MM-YYYY');

    this.cuentaCorrienteUf.crearCobro(formData).subscribe(resp => {
      this.initForm();
      this.store.dispatch(new LoadCuentaCorrienteUfAction());
      this.msg.success(`Creado!`);
      this.drawerRef.close();
    });
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

  protected searchChequesTercerosList(display: string) {
    this.chequesTercerosService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string; monto: number }[]) => {
        this.isLoading = false;
        this.cheques = data;
      });
  }
}
