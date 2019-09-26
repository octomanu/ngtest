import { Injectable } from '@angular/core';
import { FormInteractions } from './gastos.form/form-interactions.facade';
import { GastosForm } from '../forms/gastos.form';
import { FormArray } from '@angular/forms';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import {
  SaveRequest,
  CloseCreateForm,
} from 'redux/gastos/create-form/create-form.actions';
import { GastosDescripcionesService } from '@core/http/gastos-descripciones/gastos-descripciones.service';
import { editFormData } from 'redux/gastos/edit-form/edit-form.selectors';
import { ServiciosFinderService } from 'app/routes/services/type-ahead/servicios-finder/servicios-finder.service';
import { ProveedorFinderService } from 'app/routes/services/type-ahead/proveedor-finder/proveedor-finder.service';
import { ConsorciosFinderService } from 'app/routes/services/type-ahead/consorcios-finder/consorcios-finder.service';
import { UnidadesFuncionalesService } from '@core/http/unidades-funcionales/unidades-funcionales.service';
import { PorcentajesConsorciosService } from '@core/http/porcentajes_consorcios/porcentajes-consorcios.service';
import { map, filter, mergeMap } from 'rxjs/operators';
import {
  CloseEditForm,
  GastosUpdateRequest,
} from 'redux/gastos/edit-form/edit-form.actions';
import { openForm } from 'redux/gastos/gastos.selectors';
import { iif, empty, of } from 'rxjs';
@Injectable()
export class GastosFormFacade {
  constructor(
    readonly interactions: FormInteractions,
    private store: Store<AppState>,
    private formBuilder: GastosForm,
    private gastosDescripcionesService: GastosDescripcionesService,
    public consorciosSelect: ConsorciosFinderService,
    public proveedorSelect: ProveedorFinderService,
    public serviciosSelect: ServiciosFinderService,
    public ufsService: UnidadesFuncionalesService,
    public porcentajesService: PorcentajesConsorciosService,
  ) {}

  get form() {
    return this.formBuilder.form;
  }

  loadFormData() {
    const editInitializer = this.store.select(editFormData).pipe(
      filter(data => data),
      map(data => {
        const value = this.formatGasto(data);
        this.searchSelectData(data);
        this.addPercentajesRow(value.porcentuales.length);
        this.addCuotasRow(value.cuotas.length);
        this.form.setValue(value);
        return { ...value };
      }),
    );

    return this.store
      .select(openForm)
      .pipe(
        mergeMap(openForm =>
          iif(() => openForm === 'edit', editInitializer, of(null)),
        ),
      );
  }

  closeForm() {
    if (this.form.value.id) {
      this.store.dispatch(new CloseEditForm());
    } else {
      this.store.dispatch(new CloseCreateForm());
    }
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

  create(keepProveedor = false, keepConsorcio = false, keepServicio = false) {
    const gasto = this.formBuilder.resolveGasto(this.form);
    this.store.dispatch(new SaveRequest({ data: gasto }));
    this.restartForm();

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

  update() {
    const gasto = { ...this.form.value };
    gasto.fecha = moment(gasto.fecha).format('DD-MM-YYYY');
    for (const cuota of gasto.cuotas) {
      cuota.fecha_pago = moment(gasto.fecha_pago).format('DD-MM-YYYY');
    }
    this.store.dispatch(new GastosUpdateRequest({ data: gasto }));
  }

  recalculateCuotas(cuotasAmount: number) {
    const oldCuotasValue = [...this.form.get('cuotas').value];
    this.addCuotasRow(cuotasAmount);
    const amount = this.form.get('monto').value;
    const cuotas = this.form.get('cuotas') as FormArray;
    const fecha = this.form.get('fecha').value;
    const initialDate = fecha ? moment(fecha, 'DD-MM-YYYY') : moment();
    const { value, remainder } = this.getCuotasValue(amount, cuotasAmount);

    // tslint:disable-next-line: forin
    for (const i in cuotas.controls) {
      const index = parseInt(i, 10);
      const numeroFactura = oldCuotasValue[index]
        ? oldCuotasValue[index]['numero_factura']
        : null;
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
    data.consorcios = [data.id_consorcio];
    data.unidades_funcionales = [];
    data.id_concepto_gastos = null;
    data.fecha = data.fecha ? moment(data.fecha, 'DD-MM-YYYY').toDate() : null;

    for (const cuota of data.cuotas) {
      cuota.fecha_pago = cuota.fecha_pago
        ? moment(cuota.fecha_pago, 'DD-MM-YY').toDate()
        : cuota.fecha_pago;
    }

    delete data['proveedor-razon_social'];
    delete data['consorcio-display'];
    delete data['proveedor-razon_social'];
    delete data['consorcio-display'];
    delete data.id_consorcio;
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
