import { Component, OnInit } from '@angular/core';
import { Input, ChangeDetectorRef } from '@angular/core';
import { FormArray } from '@angular/forms';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { GastosService } from '@core/http/gastos/gastos.service';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { CategoriasFinderService } from 'app/routes/services/type-ahead/categorias-finder/categorias-finder.service';
import { GastosFormFacade } from '../facade/gastos-form.facade';

@Component({
  selector: 'app-gastos-form',
  template: `
    <app-principal
      [form]="gastosForm.form"
      (updateConsorcio)="updateConsorcio($event)"
      (openPorcentuales)="openPorcentualesDrawer()"
      (openCuotas)="openCuotasDrawer()"
      (openProveedor)="openProveedoresForm()"
      (multiPorcentual)="changeMultiplePorcentual($event)"
      (changeCuotas)="initCuotas($event)"
    ></app-principal>
  `,
  styles: [],
})
export class GastosFormComponent implements OnInit {
  factura: string = null;
  @Input() id: number | undefined;
  @Input() protected valueChange: Subject<{ submit: boolean }>;
  protected cuotas = [];
  protected current = 0;
  isLoading = true;
  protected timeout = null;
  protected keep = { proveedor: false, consorcio: false, gasto: false };
  protected initialized = false;
  constructor(
    protected msg: NzMessageService,
    protected cdr: ChangeDetectorRef,
    protected gastosService: GastosService,
    protected drawerRef: NzDrawerRef<{ submit: boolean }>,
    protected chequerasService: ProveedoresService,
    public categoriasFinder: CategoriasFinderService,
    public gastosForm: GastosFormFacade,
  ) {
    this.drawerRef.afterOpen.subscribe(data => {
      this.initialized = true;
    });
  }

  ngOnInit() {
    this.gastosForm.restartForm();
    //inicia la carga del formulario.
    this.gastosForm.jeje.subscribe();
  }

  submit() {
    const proveedor = Object.assign({}, this.gastosForm.form.value);
    if (proveedor.id) {
      proveedor.fecha = moment(proveedor.fecha).format('DD-MM-YYYY');
      for (const cuota of proveedor.cuotas) {
        cuota.fecha_pago = moment(proveedor.fecha_pago).format('DD-MM-YYYY');
      }
      this.gastosService.update(proveedor.id, proveedor).subscribe(data => {
        this.msg.success(`Actualizado!`);
        this.cdr.detectChanges();
      });
    } else {
      this.gastosForm.create();
    }
  }

  updateConsorcio(selectedIds: number[]) {
    if (!this.initialized) {
      return;
    }
    this.searchDataForm();
    if (selectedIds.length === 1) {
      this.gastosForm.addPercentajesRow(0);
    }
  }

  searchDataForm(timeout = false) {
    const idProveedor: string = this.gastosForm.form.get('id_proveedor').value;
    const idConsorcio: string = this.gastosForm.form.get('consorcios').value;
    const gasto: string = this.gastosForm.form.get('descripcion').value;

    if (idProveedor == null || idConsorcio.length !== 1 || gasto == null)
      return;

    if (this.timeout) window.clearTimeout(this.timeout);

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
            this.gastosForm.form
              .get('id_categoria')
              .setValue(data.id_categoria);
            this.gastosForm.form.get('monto').setValue(data.monto);
            this.gastosForm.form
              .get('periodicidad')
              .setValue(data.periodicidad);
            this.gastosForm.form.get('prevision').setValue(data.prevision);
            this.gastosForm.form
              .get('prorrateable')
              .setValue(data.prorrateable);
            this.gastosForm.form.get('fecha').setValue(data.fecha);
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
          this.gastosForm.form.get('id_rubro').setValue(data.id_rubro);
          this.gastosForm.form.get('monto').setValue(data.monto);
          this.gastosForm.form.get('prevision').setValue(data.prevision);
          this.gastosForm.form.get('prorrateable').setValue(data.prorrateable);
          this.gastosForm.form.get('fecha').setValue(data.fecha);
        });
    }
  }

  changeMultiplePorcentual(data: {
    multiple: boolean;
    porcentuales: { id: number; display: string }[];
  }) {
    if (!this.initialized) return;
    console.log('multiple', data);
    if (data.multiple) {
      this.gastosForm.form.get('id_concepto_gastos').setValue(null);
      this.gastosForm.form.get('unidades_funcionales').setValue(null);
      this.gastosForm.addPercentajesRow(data.porcentuales.length);
      this.openPorcentualesDrawer();
    } else {
      this.gastosForm.addPercentajesRow(0);
    }
  }

  openProveedoresForm() {
    this.gastosForm.interactions.openProveedoresForm();
  }

  crearPlantilla() {
    this.gastosForm.interactions.openGastosDescripcionesForm();
  }

  cargarPlantilla(id: number) {
    this.gastosForm.loadDescription(id);
  }

  openCuotasDrawer() {
    this.gastosForm.interactions.openCuotasForm();
  }

  openPorcentualesDrawer() {
    this.gastosForm.interactions.openPorcentualesForm();
  }

  initCuotas(cuotasAmount: number) {
    if (!this.initialized && this.id) return;
    this.gastosForm.addCuotasRow(cuotasAmount);
    this.gastosForm.recalculateCuotas(cuotasAmount);
    if (cuotasAmount > 1) this.openCuotasDrawer();
  }
}
