import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class SalayForm {
  public preview: any;
  public form: FormGroup;
  public salarayData;

  constructor(protected fb: FormBuilder) {
    this.initForm();
  }

  get horasExtras() {
    return this.form.get('horas_extras') as FormArray;
  }

  initForm() {
    this.preview = null;
    this.salarayData = null;
    this.form = this.fb.group({
      mes_anio: [null, [Validators.required]],
      horas_trabajadas: [null, [Validators.required]],
      dias_licencia: [0, [Validators.required]],
      dias_licencia_justificada: [0, [Validators.required]],
      dias_vacaciones: [0, [Validators.required]],
      dias_no_vacaciones: [0, [Validators.required]],
      concepto_recibo: [null, [Validators.required]],
      aportes_mes_anio: [null, [Validators.required]],
      aportes_fecha_deposito: [null, [Validators.required]],
      aportes_banco: [null, [Validators.required]],
      horas_extras: this.fb.array([]),
    });
  }

  newHoraExtra() {
    this.horasExtras.push(
      this.fb.group({
        porcentaje: [null, [Validators.required, Validators.max(100)]],
        descripcion: [null, [Validators.required, Validators.maxLength(255)]],
        cantidad_horas: [null, [Validators.required]],
      }),
    );
  }

  deleteHoraExtra(index) {
    this.horasExtras.removeAt(index);
  }

  buildSalary(idEmpleado) {
    const formValue = { ...this.form.value };
    const firstPart = {
      id_empleado: idEmpleado,
      mes: moment(this.form.value.mes_anio).format('MM'),
      anio: moment(this.form.value.mes_anio).format('YYYY'),
      aportes_mes: moment(this.form.value.aportes_mes_anio).format('MM'),
      aportes_anio: moment(this.form.value.aportes_mes_anio).format('YYYY'),
      aportes_fecha_deposito: moment(
        this.form.value.aportes_fecha_deposito,
      ).format('DD-MM-YYYY'),
    };

    const horasExtras = this.form
      .get('horas_extras')
      .value.map((value: any) => {
        return { ...value };
      });

    delete formValue.mes_anio;
    delete formValue.aportes_mes_anio;

    return (this.salarayData = {
      ...formValue,
      ...firstPart,
      horas_extras: horasExtras,
    });
  }
}
