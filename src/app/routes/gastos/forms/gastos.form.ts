import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';

@Injectable()
export class GastosForm {
  private formGroup: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.initForm();
    this.initCuotasChild();
    this.initPorcentualesChild();
  }

  get form() {
    return this.formGroup;
  }

  get multiPorcentajes() {
    return this.porcentuales.length > 1;
  }

  get cuotasAmount() {
    return this.cuotas.length;
  }

  get porcentuales() {
    return this.form.get('porcentuales') as FormArray;
  }

  get cuotas() {
    return this.form.get('cuotas') as FormArray;
  }

  initForm(edit?: boolean) {
    this.formGroup = this.fb.group({
      id: [null, []],
      id_proveedor: [null, []],
      id_categoria: [null, [Validators.required]],
      consorcios: [[], [Validators.required]],
      id_concepto_gastos: [null, []],
      unidades_funcionales: [[], []],
      descripcion: [null, [Validators.required]],
      id_servicio: [null, [Validators.required]],
      afecta_estado_financiero: [true, [Validators.required]],
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
    });
    if (edit) {
      this.formGroup.removeControl('incluir_periodo_actual');
    }
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
    this.formGroup.setControl('porcentuales', this.fb.array(array));
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
    this.formGroup.setControl('cuotas', this.fb.array(array));
  }

  resolveGasto(form: FormGroup) {
    let gasto = null;

    const porcentualesArray = this.formGroup.get('porcentuales') as FormArray;
    const multiple = porcentualesArray.length > 1;
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
