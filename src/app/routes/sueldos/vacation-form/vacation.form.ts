import { Injectable } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class VacationForm {
  public form: FormGroup;
  public preview: any;
  public vacationData: any;
  constructor(protected fb: FormBuilder) {
    this.initForm();
  }

  initForm() {
    this.preview = null;
    this.vacationData = null;
    this.form = this.fb.group({
      mes_anio: [null, [Validators.required]],
      aportes_mes_anio: [null, [Validators.required]],
      aportes_fecha_deposito: [null, [Validators.required]],
      aportes_banco: [null, [Validators.required]],
      dias_vacaciones: [null, [Validators.required]],
      dias_vacaciones_valor: [null, [Validators.required]],
    });
  }

  getValue(idEmpleado) {
    const formValue = { ...this.form.value };
    const vacations = {
      id_empleado: idEmpleado,
      mes: moment(this.form.value.mes_anio).format('MM'),
      anio: moment(this.form.value.mes_anio).format('YYYY'),
      aportes_mes: moment(this.form.value.aportes_mes_anio).format('MM'),
      aportes_anio: moment(this.form.value.aportes_mes_anio).format('YYYY'),
      aportes_banco: formValue.aportes_banco,
      aportes_fecha_deposito: moment(
        this.form.value.aportes_fecha_deposito,
      ).format('DD-MM-YYYY'),
      vacaciones_dias: formValue.dias_vacaciones,
      vacaciones_valor_dia: formValue.dias_vacaciones_valor,
    };

    return (this.vacationData = vacations);
  }
}
