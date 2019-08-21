import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { DeudaForm } from './deuda.form';
import { NzMessageService, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd';
import { CuentaCorrienteUfService } from '@core/http/cuenta-corriente-uf/cuenta-corriente-uf.service';
import { GlobalState } from 'redux/global/globa.reducer';
import * as moment from 'moment';
import { LoadCuentaCorrienteUfAction } from 'redux/cuenta-corriente-uf/cuenta-corriente-uf-actions';

@Component({
  selector: 'app-deuda-form',
  templateUrl: './deuda-form.component.html',
  styles: [],
})
export class DeudaFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscripcion: Subscription;
  isLoading = false;
  timeout = null;
  cheques: { id: number; display: string; monto: number }[];
  constructor(
    public store: Store<AppState>,
    public fb: DeudaForm,
    public msg: NzMessageService,
    public drawerRef: NzDrawerRef<{ submit: boolean }>,
    public drawerService: NzDrawerService,
    public cuentaCorrienteUf: CuentaCorrienteUfService,
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
    const formData = { ...this.form.value };
    formData.fecha = moment(formData.fecha).format('DD-MM-YYYY');

    this.cuentaCorrienteUf.crearDeuda(formData).subscribe(resp => {
      this.store.dispatch(new LoadCuentaCorrienteUfAction());
      this.msg.success(`Creado!`);
      this.drawerRef.close();
    });
  }
}
