import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CreateUpdateForm } from '@core/lambe/create-update-form.class';
import { EmpleadosForm } from './empleados.form';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { EmpleadosService } from '@core/http/empleados/empleados.service';
import * as moment from 'moment';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { switchMap } from 'rxjs/operators';
import { FuncionesProfesionalesService } from '@core/http/funcionales-profesionales/funciones-profesionales.service';
import { forkJoin } from 'rxjs';
import { EstadoEmpleadosService } from '@core/http/estado-empleados/estado-empleados.service';

@Component({
  selector: 'app-empleados-form',
  templateUrl: './empleados-form.component.html',
  styles: [],
})
export class EmpleadosFormComponent extends CreateUpdateForm implements OnInit {
  timeout = null;
  isLoading = true;
  consorcios: { id: number; display: string }[];
  funcionesProfesionales: { id: number; display: string }[];
  estadoEmpleados: { id: number; display: string }[];
  constructor(
    fb: EmpleadosForm,
    msg: NzMessageService,
    cdr: ChangeDetectorRef,
    drawerRef: NzDrawerRef<{ submit: boolean }>,
    translate: TranslateService,
    dataService: EmpleadosService,
    public consorciosService: ConsorciosService,
    public funcionesProfesionalesService: FuncionesProfesionalesService,
    public estadoEmpleadosService: EstadoEmpleadosService,
  ) {
    super(fb, msg, cdr, drawerRef, translate, dataService);
  }

  ngOnInit() {
    this.initForm();

    if (this.id) {
      this.initEdit();
    } else {
      this.initCreate();
    }
  }

  initCreate() {
    forkJoin([
      this.consorciosService.searchByDisplay(''),
      this.funcionesProfesionalesService.searchByDisplay(''),
      this.estadoEmpleadosService.searchByDisplay(''),
    ]).subscribe((resp: any[]) => {
      this.consorcios = resp[0];
      this.funcionesProfesionales = resp[1];
      this.estadoEmpleados = resp[2];
      this.isLoading = false;
    });
  }

  initEdit() {
    this.dataService
      .find(this.id)
      .pipe(
        switchMap(empleado => {
          this.form.setValue(empleado);
          return forkJoin([
            this.consorciosService.searchByDisplay('', empleado.id_consorcio),
            this.funcionesProfesionalesService.searchByDisplay(''),
            this.estadoEmpleadosService.searchByDisplay(''),
          ]);
        }),
      )
      .subscribe((resp: any[]) => {
        this.consorcios = resp[0];
        this.funcionesProfesionales = resp[1];
        this.estadoEmpleados = resp[2];
        this.isLoading = false;
      });
  }

  getFormData() {
    const formData = { ...this.form.value };
    formData.fecha_nacimiento = moment(formData.fecha_nacimiento).format(
      'DD-MM-YYYY',
    );
    return formData;
  }

  searchFuncionesProfesionales(display: string) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.isLoading = true;
      this.searchConsorciosList(display);
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

  protected searchFuncionesProfesionalesList(display: string) {
    this.funcionesProfesionalesService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.funcionesProfesionales = data;
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
}
