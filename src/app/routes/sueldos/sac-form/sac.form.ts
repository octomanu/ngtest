import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class SacForm {
  public sacData: any;
  public form: FormGroup;
  public preview: any;
  constructor(protected fb: FormBuilder) {
    this.initForm();
  }

  get horasExtras() {
    return this.form.get('horas_extras') as FormArray;
  }

  initForm() {
    this.form = this.fb.group({
      mes_anio: [null, [Validators.required]],
      dias_licencia: [0, [Validators.required]],
      mejor_sueldo_bruto: [null, [Validators.required]],
      dias_licencia_justificada: [0, [Validators.required]],
      aportes_mes_anio: [null, [Validators.required]],
      aportes_fecha_deposito: [null, [Validators.required]],
      aportes_banco: [null, [Validators.required]],
      horas_extras: this.fb.array([]),
    });
  }

  newHoraExtra() {
    this.horasExtras.push(
      this.fb.group({
        concepto: [null, [Validators.required, Validators.maxLength(255)]],
        valor: [null, [Validators.required]],
      }),
    );
  }

  deleteHoraExtra(index) {
    this.horasExtras.removeAt(index);
  }

  getValue(idEmpleado) {
    const formValue = this.form.value;
    const horasExtras = this.form
      .get('horas_extras')
      .value.map((value: any) => {
        return { ...value };
      });

    return (this.sacData = {
      id_empleado: idEmpleado,
      mes: moment(this.form.value.mes_anio).format('MM'),
      anio: moment(this.form.value.mes_anio).format('YYYY'),
      aportes_mes: moment(this.form.value.aportes_mes_anio).format('MM'),
      aportes_anio: moment(this.form.value.aportes_mes_anio).format('YYYY'),
      aportes_banco: formValue.aportes_banco,
      mejor_sueldo_bruto: formValue.mejor_sueldo_bruto,
      aportes_fecha_deposito: moment(
        this.form.value.aportes_fecha_deposito,
      ).format('DD-MM-YYYY'),
      horas_extras: horasExtras,
    });
  }
}
