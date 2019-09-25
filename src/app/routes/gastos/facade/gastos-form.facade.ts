import { Injectable } from '@angular/core';
import { FormInteractions } from './gastos.form/form-interactions.facade';
import { GastosForm } from '../forms/gastos.form';
import { FormArray } from '@angular/forms';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { SaveRequest } from 'redux/gastos/create-form/create-form.actions';
import { GastosDescripcionesService } from '@core/http/gastos-descripciones/gastos-descripciones.service';
import { editFormData } from 'redux/gastos/edit-form/edit-form.selectors';
import { ServiciosFinderService } from 'app/routes/services/type-ahead/servicios-finder/servicios-finder.service';
import { ProveedorFinderService } from 'app/routes/services/type-ahead/proveedor-finder/proveedor-finder.service';
import { ConsorciosFinderService } from 'app/routes/services/type-ahead/consorcios-finder/consorcios-finder.service';
import { UnidadesFuncionalesService } from '@core/http/unidades-funcionales/unidades-funcionales.service';
import { PorcentajesConsorciosService } from '@core/http/porcentajes_consorcios/porcentajes-consorcios.service';
import { map, withLatestFrom, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable()
export class GastosFormFacade {
  get form() {
    return this.formBuilder.form;
  }

  jeje: Observable<any>;

  constructor(
    private store: Store<AppState>,
    private formBuilder: GastosForm,
    private gastosDescripcionesService: GastosDescripcionesService,
    public consorciosSelect: ConsorciosFinderService,
    public proveedorSelect: ProveedorFinderService,
    public serviciosSelect: ServiciosFinderService,
    readonly interactions: FormInteractions,
    public ufsService: UnidadesFuncionalesService,
    public porcentajesService: PorcentajesConsorciosService,
  ) {}

  loadFormData() {
    this.store
      .select(editFormData)
      .pipe(
        take(1),
        map(data => {
          if (!data) return;
          const value = this.formatGasto(data);
          this.searchSelectData(data);
          this.addPercentajesRow(data.porcentuales.length);
          this.addCuotasRow(data.cuotas.length);
          this.form.removeControl('incluir_periodo_actual');
          this.form.setValue(value);
          return value;
        }),
      )
      .subscribe();
  }

  restartForm() {
    this.formBuilder.initForm();
    this.formBuilder.initCuotasChild();
    this.formBuilder.initPorcentualesChild();
  }

  loadDescription(id: number) {
    if (id) {
      this.gastosDescripcionesService.find(id).subscribe((data: any) => {
        this.form.get('descripcion').setValue(data.descripcion);
      });
    } else {
      this.form.get('descripcion').setValue('');
    }
  }

  addCuotasRow(amount: number) {
    this.formBuilder.initCuotasChild(amount);
  }

  addPercentajesRow(amount: number) {
    this.formBuilder.initPorcentualesChild(amount);
  }

  resolveGasto() {
    return this.formBuilder.resolveGasto(this.form);
  }

  create(keepProveedor = false, keepConsorcio = false, keepServicio = false) {
    const gasto = this.resolveGasto();
    this.store.dispatch(new SaveRequest({ data: gasto }));
    this.formBuilder.initForm();

    if (keepProveedor) {
      const proveedorValue: string = this.form.get('id_proveedor').value;
      this.form.get('id_proveedor').setValue(proveedorValue);
    }

    if (keepConsorcio) {
      const consorcioValue: string = this.form.get('consorcios').value;
      this.form.get('consorcios').setValue(consorcioValue);
    }

    if (keepServicio) {
      const gastoValue: string = this.form.get('descripcion').value;
      this.form.get('descripcion').setValue(gastoValue);
    }
  }

  // HELPERSSSS

  recalculateCuotas(cuotasAmount: number) {
    const amount = this.form.get('monto').value;
    const cuotas = this.form.get('cuotas') as FormArray;
    const fecha = this.form.get('fecha').value;
    const initialDate = fecha ? moment(fecha, 'DD-MM-YYYY') : moment();
    const { value, remainder } = this.getCuotasValue(amount, cuotasAmount);

    // tslint:disable-next-line: forin
    for (const i in cuotas.controls) {
      const index = parseInt(i, 10);
      const numeroFactura = cuotas.controls[index].value['numero_factura'];
      const monto =
        index === 0 ? (value + remainder).toFixed(2) : value.toFixed(2);
      if (index > 0) initialDate.add(1, 'M');
      cuotas.controls[index].setValue({
        monto,
        fecha_pago: initialDate.toDate(),
        id: null,
        numero_cuota: null,
        numero_factura: numeroFactura,
        id_periodo: null,
      });
    }
  }

  private getCuotasValue(amount, cuotasAmount: number) {
    let value = 0;
    let remainder = 0;
    value = parseFloat(amount) / cuotasAmount;
    remainder = amount - value * cuotasAmount;
    value = +value.toFixed(2);
    remainder = +remainder.toFixed(2);
    return { value, remainder };
  }

  private formatGasto(data: any) {
    delete data['proveedor-razon_social'];
    delete data['consorcio-display'];
    delete data['proveedor-razon_social'];
    delete data['consorcio-display'];
    delete data.id_consorcio;
    data.consorcios = [data.id_consorcio];
    data.unidades_funcionales = [];
    data.id_concepto_gastos = null;
    data.fecha = data.fecha ? moment(data.fecha, 'DD-MM-YYYY').toDate() : null;

    for (const cuota of data.cuotas) {
      cuota.fecha_pago = cuota.fecha_pago
        ? moment(cuota.fecha_pago, 'DD-MM-YY').toDate()
        : cuota.fecha_pago;
    }
    return data;
  }

  private searchSelectData(data: any) {
    this.ufsService.setConsorcio(data.id_consorcio);
    this.porcentajesService.setConsorcio(data.id_consorcio);
    this.proveedorSelect.search(data['proveedor-razon_social']);
    this.consorciosSelect.searchConsorcios(data['consorcio-display']);
    this.serviciosSelect.search('', data['id_servicio']);
  }
}
