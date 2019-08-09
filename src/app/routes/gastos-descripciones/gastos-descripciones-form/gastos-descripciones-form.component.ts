import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { GastosDescripcionesForm } from './gastos-descripciones.form';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { GastosDescripcionesService } from '@core/http/gastos-descripciones/gastos-descripciones.service';
import { GlobalState } from 'redux/global/globa.reducer';
import { LoadGastosDescripcionesAction } from 'redux/gastos-descripciones/gastos-descripciones.actions';

@Component({
  selector: 'app-gastos-descripciones-form',
  templateUrl: './gastos-descripciones-form.component.html',
  styles: [],
})
export class GastosDescripcionesFormComponent implements OnInit, OnDestroy {
  @Input() id: number | undefined;
  @Input() minWidth = '75%';
  form: FormGroup;
  subscripcion: Subscription;
  constructor(
    protected store: Store<AppState>,
    protected fb: GastosDescripcionesForm,
    protected msg: NzMessageService,
    protected drawerRef: NzDrawerRef<{ submit: boolean }>,
    protected gastosDescripcionesService: GastosDescripcionesService,
  ) {}

  ngOnInit() {
    this.initForm();

    this.drawerRef.afterOpen.subscribe(() => {
      this.subscripcion = this.store
        .select('globalState')
        .subscribe((state: GlobalState) => {
          this.drawerRef.nzWidth = state.smallViewport ? '100%' : this.minWidth;
        });
    });

    if (this.id) {
      this.gastosDescripcionesService.find(this.id).subscribe((data: any) => {
        this.form.setValue(data);
      });
    }
  }

  initForm() {
    this.form = this.fb.getForm();
  }

  submit() {
    if (this.form.value.id) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    const formData = this.form.value;
    this.gastosDescripcionesService.create(formData).subscribe(data => {
      this.initForm();
      this.store.dispatch(new LoadGastosDescripcionesAction());
      this.msg.success(`Creado!`);
    });
  }

  update() {
    const formData = this.form.value;
    this.gastosDescripcionesService
      .update(formData.id, formData)
      .subscribe(data => {
        this.msg.success(`Actualizado!`);
        this.store.dispatch(new LoadGastosDescripcionesAction());
      });
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }
}
