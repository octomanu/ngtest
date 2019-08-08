import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { IngresoForm } from './ingreso.form';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { CajaConsorcioService } from '@core/http/caja-consorcio/caja-consorcio.service';
import { GlobalState } from 'redux/global/globa.reducer';
import { UnidadesFuncionalesService } from '@core/http/unidades-funcionales/unidades-funcionales.service';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import * as moment from 'moment';
import { LoadCajaConsorcioAction } from 'redux/caja-consorcio/caja-consorcio.actions';

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
  ufs: { id: number; display: string }[];

  constructor(
    public store: Store<AppState>,
    public fb: IngresoForm,
    public msg: NzMessageService,
    public drawerRef: NzDrawerRef<{ submit: boolean }>,
    public cajaConsorcioService: CajaConsorcioService,
    public ufsService: UnidadesFuncionalesService,
    public consorciosService: ConsorciosService,
  ) {}

  ngOnInit() {
    console.log(this.type);
    this.initForm();
    this.searchConsorciosList('');
    this.drawerRef.afterOpen.subscribe(() => {
      this.subscripcion = this.store
        .select('globalState')
        .subscribe((state: GlobalState) => {
          this.drawerRef.nzWidth = state.smallViewport ? '100%' : '75%';
        });
    });
  }

  initForm() {
    this.form = this.fb.getForm();
  }

  submit() {
    const ingreso = this.buildIngreso();
    console.log(ingreso);
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
    const formValue = this.form.value;
    const efectivo = formValue.efectivo ? parseInt(formValue.efectivo, 10) : 0;
    const ingreso = {
      fecha: moment(formValue.fecha).format('DD-MM-YYYY'),
      descripcion: formValue.descripcion,
      monto: efectivo,
      id_consorcio: formValue.id_consorcio,
      lineas: [{ monto: efectivo, metodo: 'efectivo' }],
    };

    if (formValue.id_unidad_funcional) {
      return { ...ingreso, id_unidad_funcional: formValue.id_unidad_funcional };
    }

    return ingreso;
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

  protected searchConsorciosList(display: string) {
    this.consorciosService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.consorcios = data;
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

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }
}
