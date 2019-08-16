import { Component, OnInit, Output } from '@angular/core';
import { Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { GastosForm } from './gastos.form';
import { NzMessageService, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd';
import { GastosService } from '@core/http/gastos/gastos.service';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UnidadesFuncionalesService } from '@core/http/unidades-funcionales/unidades-funcionales.service';
import { PorcentajesConsorciosService } from '@core/http/porcentajes_consorcios/porcentajes-consorcios.service';
import { ProveedorFormComponent } from 'app/routes/proveedores/proveedor-form/proveedor-form.component';
import { ServiciosService } from '@core/http/servicios/servicios.service';
import { CategoriasService } from '@core/http/categorias/categorias.service';
import { GastosDescripcionesFormComponent } from 'app/routes/gastos-descripciones/gastos-descripciones-form/gastos-descripciones-form.component';
import { GastosDescripcionesService } from '@core/http/gastos-descripciones/gastos-descripciones.service';

@Component({
  selector: 'app-gastos-form',
  templateUrl: './gastos-form.component.html',
  styles: [],
})
export class GastosFormComponent implements OnInit {
  descripcionsfilter = false;
  plantilla: number;
  factura: string = null;
  // cuotas
  cuotasVisible = false;
  porcentualesVisible = false;
  // cuotas
  form: FormGroup;
  @Output() formVisible: EventEmitter<boolean> = new EventEmitter();
  @Input() id: number | undefined;
  @Input() protected valueChange: Subject<{ submit: boolean }>;
  protected cuotasAmount = 1;
  multiPorcentajes = false;
  protected cuotas = [];
  protected current = 0;
  isLoading = true;
  proveedores: { id: number; display: string }[];
  descripciones: { id: number; display: string }[];
  consorcios: { id: number; display: string }[];
  servicios: { id: number; display: string }[];
  ufs: { id: number; display: string }[];
  porcentajes: { id: number; display: string }[] = [];
  categorias: { id: number; display: string }[] = [];
  protected timeout = null;
  protected keep = { proveedor: false, consorcio: false, gasto: false };
  protected initialized = false;
  constructor(
    protected fb: GastosForm,
    protected msg: NzMessageService,
    protected cdr: ChangeDetectorRef,
    protected gastosService: GastosService,
    protected proveedorService: ProveedoresService,
    protected consorciosService: ConsorciosService,
    protected ufsService: UnidadesFuncionalesService,
    protected porcentajesService: PorcentajesConsorciosService,
    protected drawerRef: NzDrawerRef<{ submit: boolean }>,
    protected chequerasService: ProveedoresService,
    protected drawerService: NzDrawerService,
    protected fbBulder: FormBuilder,
    protected serviciosService: ServiciosService,
    protected categoriasService: CategoriasService,
    protected gastosDescripcionesService: GastosDescripcionesService,
    private translate: TranslateService,
  ) {
    this.drawerRef.afterOpen.subscribe(data => {
      this.initialized = true;
    });
  }

  openCuotasDrawer() {
    this.cuotasVisible = true;
  }
  closeCuotasDrawer() {
    this.cuotasVisible = false;
  }

  openPorcentualesDrawer() {
    this.porcentualesVisible = true;
  }
  closePorcentualesDrawer() {
    this.porcentualesVisible = false;
  }

  initCuotas() {
    if (!this.initialized && this.id) {
      return;
    }

    if (!this.cuotasAmount) {
      this.cuotasAmount = 1;
    }
    this.form.setControl('cuotas', this.fb.initCuotasChild(this.cuotasAmount));
    const cuotas = this.form.get('cuotas') as FormArray;

    const gastoAmount = this.form.get('monto').value;
    let total = null;
    const fecha = this.form.get('fecha').value;
    let remainder = 0;
    this.cuotas = [];

    if (gastoAmount) {
      total = parseFloat(gastoAmount) / this.cuotasAmount;
      total = +total.toFixed(2);
      remainder = gastoAmount - total * this.cuotasAmount;
      remainder = +remainder.toFixed(2);
    }
    const fechaValue = fecha ? moment(fecha, 'DD-MM-YYYY') : moment();

    // tslint:disable-next-line: forin
    for (const i in cuotas.controls) {
      const index = parseInt(i, 10);
      if (index > 0) {
        fechaValue.add(1, 'M');
      }
      cuotas.controls[index].setValue({
        monto: i === '0' ? (total + remainder).toFixed(2) : total.toFixed(2),
        fecha_pago: fechaValue.toDate(),
        id: null,
        numero_cuota: null,
        numero_factura: index === 0 ? this.factura : null,
        id_periodo: null,
      });
    }

    for (let i = 0; i < this.cuotasAmount; i++) {
      if (i > 0) {
        fechaValue.add(1, 'M');
      }

      this.cuotas.push({
        monto: i === 0 ? (total + remainder).toFixed(2) : total.toFixed(2),
        fecha: fechaValue.toDate(),
      });
    }

    if (this.cuotasAmount > 1) {
      this.openCuotasDrawer();
    }
  }

  modifyCuotas(index: number) {
    if (!this.initialized && this.id) {
      return;
    }
    const cuotas = this.form.get('cuotas') as FormArray;
    const gastoAmount = this.form.get('monto').value;

    const totalCuotas = cuotas.length;
    let previousAmount = 0;
    const leftCuotas = totalCuotas - (index + 1);
    if (leftCuotas === 0) {
      return;
    }
    for (let i = 0; i <= index; i++) {
      previousAmount += parseFloat(cuotas.controls[i].value.monto);
    }

    const nextAmount = gastoAmount - previousAmount;
    let nextValue = nextAmount / leftCuotas;
    nextValue = +nextValue.toFixed(2);
    let remainder = nextAmount - nextValue * leftCuotas;
    remainder = +remainder.toFixed(2);
    let j = index + 1;
    for (j; j < totalCuotas; j++) {
      const value = { ...cuotas.controls[j].value, monto: nextValue };
      cuotas.controls[j].setValue(value);
      this.cuotas[j].monto = nextValue;
    }

    const lastValue = {
      ...cuotas.controls[j - 1].value,
      monto: nextValue + remainder,
    };
    cuotas.controls[j - 1].setValue(lastValue);
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.searchCategoriasList('');
    if (!this.id) {
      this.searchProveedorList('');
      this.searchConsorciosList('');
      this.searchServiciosList('');
      this.searchDescripcionesList('');
    }
    this.open();
  }

  initForm(edit?: boolean) {
    this.form = this.fb.getForm(edit);
  }
  open() {
    this.formVisible.emit(true);
    if (this.id) {
      this.initForm(true);
      this.gastosService.find(this.id).subscribe((data: any) => {
        console.log(data);
        this.searchProveedorList(data['proveedor-razon_social']);
        this.searchConsorciosList(data['consorcio-display']);
        this.searchServiciosList('', data['id_servicio']);
        this.ufsService.setConsorcio(data.id_consorcio);
        this.porcentajesService.setConsorcio(data.id_consorcio);
        this.cuotasAmount = data.cuotas.length;
        this.multiPorcentajes = data.porcentuales.length > 1 ? true : false;

        this.searchUfsList('');
        this.form.setControl(
          'porcentuales',
          this.fb.initPorcentualesChild(data.porcentuales.length),
        );
        delete data['proveedor-razon_social'];
        delete data['consorcio-display'];

        this.form.setControl(
          'cuotas',
          this.fb.initCuotasChild(data.cuotas.length),
        );
        data.consorcios = [data.id_consorcio];
        data.unidades_funcionales = [];
        data.id_concepto_gastos = null;
        delete data.id_consorcio;
        data.fecha = data.fecha
          ? moment(data.fecha, 'DD-MM-YYYY').toDate()
          : data.fecha;

        for (const cuota of data.cuotas) {
          cuota.fecha_pago = cuota.fecha_pago
            ? moment(cuota.fecha_pago, 'DD-MM-YY').toDate()
            : cuota.fecha_pago;
        }

        this.factura = data.cuotas[0].numero_factura;
        this.form.setValue(data);
        this.porcentajesService
          .searchByDisplay('')
          .subscribe((data: { id: number; display: string }[]) => {
            this.isLoading = false;
            this.porcentajes = data;
          });
        // const cuotas = this.form.get('cuotas') as FormArray;

        // // tslint:disable-next-line: forin
        // for (const i in cuotas.controls) {
        //   const index = parseInt(i, 10);
        //   cuotas.controls[index].setValue({
        //     monto: data.data.cuotas[index].monto,
        //     fecha_pago: data.data.cuotas[index].fecha_pago,
        //     id: data.data.cuotas[index].id,
        //   });
        // }
      });
    } else {
      this.initForm();
      this.initCuotas();
    }
  }

  submit() {
    const proveedor = Object.assign({}, this.form.value);
    if (proveedor.id) {
      // REFACTORIZAR:
      console.log(proveedor);
      proveedor.fecha = moment(proveedor.fecha).format('DD-MM-YYYY');
      for (const cuota of proveedor.cuotas) {
        cuota.fecha_pago = moment(proveedor.fecha_pago).format('DD-MM-YYYY');
      }
      console.log(proveedor);
      // REFACTOR

      this.gastosService.update(proveedor.id, proveedor).subscribe(data => {
        // this.drawerRef.close({ submit: true });
        this.msg.success(`Actualizado!`);
        this.cdr.detectChanges();
        // this.drawerRef.close();
      });
    } else {
      const gasto = this.fb.resolveGasto(this.form, this.multiPorcentajes);
      console.warn('GASTO', gasto);

      // return;
      this.gastosService.create(gasto).subscribe(data => {
        // this.drawerRef.close({ submit: true });

        const proveedorValue: string = this.form.get('id_proveedor').value;
        const consorcioValue: string = this.form.get('consorcios').value;
        const gastoValue: string = this.form.get('descripcion').value;
        this.initForm();
        if (this.keep.proveedor) {
          this.form.get('id_proveedor').setValue(proveedorValue);
        }
        if (this.keep.consorcio) {
          this.form.get('consorcios').setValue(consorcioValue);
        }
        if (this.keep.gasto) {
          this.form.get('descripcion').setValue(gastoValue);
        }
        this.valueChange.next({ submit: true });
        this.msg.success(`Creado!`);
        this.cdr.detectChanges();
      });
    }
  }

  changeConsorcio() {
    if (!this.initialized) {
      return;
    }
    this.searchDataForm();

    const consorcios = this.form.get('consorcios').value;
    let idConsorcio = null;

    if (consorcios.length === 1) {
      idConsorcio = consorcios[0];
    }

    this.ufsService.setConsorcio(idConsorcio);
    this.porcentajesService.setConsorcio(idConsorcio);
    if (idConsorcio) {
      this.searchUfsList('');
      this.searchPorcentajesList('');
    } else {
      this.ufs = [];
      this.porcentajes = [];
      this.form.setControl('porcentuales', this.fb.initPorcentualesChild(0));
      this.multiPorcentajes = false;
    }
  }

  searchDataForm(timeout = false) {
    const idProveedor: string = this.form.get('id_proveedor').value;
    const idConsorcio: string = this.form.get('consorcios').value;
    const gasto: string = this.form.get('descripcion').value;

    if (idProveedor == null || idConsorcio.length !== 1 || gasto == null) {
      return;
    }

    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }

    if (timeout) {
      this.timeout = window.setTimeout(() => {
        this.timeout = null;
        this.gastosService
          .findPrevious({
            id_proveedor: idProveedor,
            id_consorcio: idConsorcio[0],
            gasto,
          })
          .subscribe(data => {
            if (!data) {
              return;
            }
            this.form.get('id_categoria').setValue(data.id_categoria);
            this.form.get('monto').setValue(data.monto);
            this.form.get('periodicidad').setValue(data.periodicidad);
            this.form.get('prevision').setValue(data.prevision);
            this.form.get('prorrateable').setValue(data.prorrateable);
            this.form.get('fecha').setValue(data.fecha);
          });
      }, 400);
    } else {
      this.gastosService
        .findPrevious({
          id_proveedor: idProveedor,
          id_consorcio: idConsorcio[0],
          gasto,
        })
        .subscribe(data => {
          if (!data) {
            return;
          }
          this.form.get('id_rubro').setValue(data.id_rubro);
          this.form.get('monto').setValue(data.monto);
          this.form.get('prevision').setValue(data.prevision);
          this.form.get('prorrateable').setValue(data.prorrateable);
          this.form.get('fecha').setValue(data.fecha);
        });
    }
  }

  searchDescripciones(display: string) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.isLoading = true;
      this.searchDescripcionesList(display);
    }, 400);
  }

  searchProveedores(display: string) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.isLoading = true;
      this.searchProveedorList(display);
    }, 400);
  }

  searchUfs(display: string) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.isLoading = true;
      this.searchUfsList(display);
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

  searchServicios(display: string) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.isLoading = true;
      this.searchServiciosList(display);
    }, 400);
  }

  searchPorcentajes(display: string) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.isLoading = true;
      this.searchPorcentajesList(display);
    }, 400);
  }

  protected searchDescripcionesList(display: string) {
    this.gastosDescripcionesService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.descripciones = data;
      });
  }

  protected searchProveedorList(display: string) {
    this.proveedorService
      .searchProveedor(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.proveedores = data;
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

  protected searchServiciosList(display: string, id?: string) {
    this.serviciosService
      .searchByDisplay(display, id)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.servicios = data;
      });
  }

  protected searchCategoriasList(display: string) {
    this.categoriasService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.categorias = data;
      });
  }

  protected searchUfsList(display: string) {
    this.ufsService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.ufs = data;
      });
  }

  protected searchPorcentajesList(display: string) {
    this.porcentajesService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.porcentajes = data;
        if (this.multiPorcentajes) {
          this.form.setControl(
            'porcentuales',
            this.fb.initPorcentualesChild(data.length),
          );
        }
      });
  }

  changeMultiplePorcentual() {
    if (!this.initialized) {
      return;
    }
    if (this.multiPorcentajes) {
      this.form.get('id_concepto_gastos').setValue(null);
      this.form.get('unidades_funcionales').setValue(null);
      this.form.setControl(
        'porcentuales',
        this.fb.initPorcentualesChild(this.porcentajes.length),
      );

      const porcentuales = this.form.get('porcentuales') as FormArray;

      // tslint:disable-next-line: forin
      for (const i in porcentuales.controls) {
        const index = parseInt(i, 10);
        porcentuales.controls[index].setValue({
          monto: null,
          tipo: 'numerico',
          id: null,
          id_porcentaje_consorcio: this.porcentajes[index].id,
        });
      }

      this.openPorcentualesDrawer();
    } else {
      this.form.setControl('porcentuales', this.fb.initPorcentualesChild());
    }
  }

  openProveedoresForm() {
    this.translate
      .get('lambe.proveedores.proveedor')
      .subscribe((res: string) => {
        this.drawerRef = this.drawerService.create<
          ProveedorFormComponent,
          { id: number }
        >({
          nzTitle: res,
          nzWidth: '50%',
          nzContent: ProveedorFormComponent,
          nzContentParams: {
            id: null,
          },
        });
      });

    this.drawerRef.afterClose.subscribe(
      (data: { submit: boolean } | undefined) => {
        this.searchProveedorList('');
      },
    );
  }

  crearPlantilla() {
    this.translate
      .get('global.gastos_descripciones')
      .subscribe((res: string) => {
        this.drawerService.create({
          nzTitle: res,
          nzWidth: '50%',
          nzContent: GastosDescripcionesFormComponent,
          nzPlacement: 'right',
          nzContentParams: { minWidth: '50%' },
        });
      });
  }

  cargarPlantilla(id: number) {
    if (!id) {
      this.form.get('descripcion').setValue('');
      return;
    }
    this.gastosDescripcionesService.find(id).subscribe((data: any) => {
      this.form.get('descripcion').setValue(data.descripcion);
    });
  }

  changeFactura() {
    const cuotas = this.form.get('cuotas') as FormArray;
    const value: any = cuotas.controls[0].value;
    value.numero_factura = this.factura;
  }
}
