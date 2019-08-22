import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class GastosForm {
  constructor(private fb: FormBuilder) {}
  getForm(edit?: boolean): FormGroup {
    const form = this.fb.group({
      id: [null, []],
      id_proveedor: [null, []],
      id_categoria: [null, [Validators.required]],
      consorcios: [[], [Validators.required]],
      id_concepto_gastos: [null, []],
      unidades_funcionales: [[], []],
      descripcion: [null, [Validators.required]],
      id_servicio: [null, [Validators.required]],
      incluir_periodo_actual: [true, [Validators.required]],
      monto: [
        null,
        [
          Validators.required,
          Validators.pattern('-?[0-9]{1,8}(?:.[0-9]{1,2})?'),
        ],
      ],
      fecha: [null, [Validators.required]],
      prevision: [false, [Validators.required]],
      prorrateable: [true, [Validators.required]],
      cuotas: this.initCuotasChild(),
      porcentuales: this.initPorcentualesChild(),
    });
    if (edit) {
      form.removeControl('incluir_periodo_actual');
    }
    console.log(edit, form);
    return form;
  }

  initPorcentualesChild(amount = 0) {
    const array = [];
    for (let i = 0; i < amount; i++) {
      const child = this.fb.group({
        monto: [
          null,
          [
            Validators.required,
            Validators.pattern('-?[0-9]{1,8}(?:.[0-9]{1,2})?'),
          ],
        ],
        tipo: ['numerico', [Validators.required]],
        id: [null],
        id_porcentaje_consorcio: [null, Validators.required],
      });
      array.push(child);
    }

    return this.fb.array(array);
  }

  initCuotasChild(amount = 1) {
    const array = [];
    for (let i = 0; i < amount; i++) {
      array.push(
        this.fb.group({
          monto: [
            null,
            [
              Validators.required,
              Validators.pattern('-?[0-9]{1,8}(?:.[0-9]{1,2})?'),
            ],
          ],
          numero_cuota: [null, []],
          numero_factura: [null, []],
          id_periodo: [null, []],
          fecha_pago: [null, [Validators.required]],
          id: [null],
        }),
      );
    }

    return this.fb.array(array);
  }

  resolveGasto(form: FormGroup, multiple: boolean) {
    let gasto = null;
    if (multiple) {
      gasto = this.resolveMultiple(form, multiple);
    } else {
      gasto = this.resolveSingle(form, multiple);
    }
    delete gasto.id_concepto_gastos;
    gasto.fecha = moment(gasto.fecha).format('DD-MM-YYYY');
    const cuotasCollections = [];
    for (const cuota of gasto.cuotas) {
      const newCuota = { ...cuota };
      newCuota.fecha_pago = moment(newCuota.fecha_pago).format('DD-MM-YYYY');
      cuotasCollections.push(newCuota);
    }
    gasto.cuotas = cuotasCollections;
    return gasto;
  }

  protected resolveMultiple(form: FormGroup, multiple: boolean) {
    const gasto = { ...form.value };
    return gasto;
  }

  protected resolveSingle(form: FormGroup, multiple: boolean) {
    const gasto = { ...form.value };
    gasto.porcentuales = [];
    console.log(gasto.id_concepto_gastos);
    if (gasto.id_concepto_gastos) {
      gasto.porcentuales = [
        {
          monto: gasto.monto,
          tipo: 'numerico',
          id_porcentaje_consorcio: gasto.id_concepto_gastos,
        },
      ];
    }
    return gasto;
  }
}
