import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { ServiciosService } from '@core/http/servicios/servicios.service';
import { ServiciosForm } from './servicios.form';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { GlobalState } from 'redux/global/globa.reducer';
import { LoadServiciosAction } from 'redux/servicios/servicios.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-servicios-form',
  templateUrl: './servicios-form.component.html',
  styles: [],
})
export class ServiciosFormComponent implements OnInit, OnDestroy {
  @Input() id: number | undefined;
  form: FormGroup;
  subscripcion: Subscription;
  constructor(
    protected store: Store<AppState>,
    protected fb: ServiciosForm,
    protected msg: NzMessageService,
    protected drawerRef: NzDrawerRef<{ submit: boolean }>,
    protected serviciosService: ServiciosService,
  ) {}

  ngOnInit() {
    this.initForm();

    this.subscripcion = this.store
      .select('globalState')
      .subscribe((state: GlobalState) => {
        this.drawerRef.nzWidth = state.smallViewport ? '100%' : '75%';
      });

    if (this.id) {
      this.serviciosService.find(this.id).subscribe((data: any) => {
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
    this.serviciosService.create(formData).subscribe(data => {
      this.initForm();
      this.store.dispatch(new LoadServiciosAction());
      this.msg.success(`Creado!`);
    });
  }

  update() {
    const formData = this.form.value;
    this.serviciosService.update(formData.id, formData).subscribe(data => {
      this.msg.success(`Actualizado!`);
      this.store.dispatch(new LoadServiciosAction());
    });
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }
}
