import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { GastosService } from '@core/http/gastos/gastos.service';
import { Observable } from 'rxjs';
import { GastosFormFacade } from '../facade/gastos-form.facade';
@Component({
  selector: 'app-gastos-form',
  template: `
    <app-principal
      [form]="gastosForm.form"
      [initializer]="initializer"
      (updateConsorcio)="updateConsorcio($event)"
      (openPorcentuales)="openPorcentualesDrawer()"
      (openCuotas)="openCuotasDrawer()"
      (openProveedor)="openProveedoresForm()"
      (multiPorcentual)="changeMultiplePorcentual($event)"
      (changeCuotas)="initCuotas($event)"
      (changePlantilla)="cargarPlantilla($event)"
      (openPlantilla)="openPlantillaForm()"
      (submit)="submit()"
    ></app-principal>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GastosFormComponent implements OnInit, OnDestroy {
  protected timeout = null;
  protected keep = { proveedor: false, consorcio: false, gasto: false };
  initializer: Observable<any>;

  constructor(
    protected gastosService: GastosService,
    public gastosForm: GastosFormFacade,
  ) {}

  ngOnInit() {
    this.gastosForm.restartForm();
    this.initializer = this.gastosForm.loadFormData();
  }

  ngOnDestroy(): void {
    this.gastosForm.closeForm();
  }

  cargarPlantilla(id: number) {
    this.gastosForm.loadDescription(id);
  }

  openProveedoresForm() {
    this.gastosForm.interactions.openProveedoresForm();
  }

  openPlantillaForm() {
    this.gastosForm.interactions.openGastosDescripcionesForm();
  }

  openCuotasDrawer() {
    this.gastosForm.interactions.openCuotasForm();
  }

  openPorcentualesDrawer() {
    this.gastosForm.interactions.openPorcentualesForm();
  }

  submit() {
    if (this.gastosForm.form.value.id) {
      this.gastosForm.update();
    } else {
      this.gastosForm.create();
    }
  }

  updateConsorcio(selectedIds: number[]) {
    if (!this.gastosForm.form.value.id) {
      //this.searchDataForm();
    }
    if (selectedIds.length === 1) {
      this.gastosForm.addPercentajesRow(0);
    }
  }

  initCuotas(cuotasAmount: number) {
    this.gastosForm.recalculateCuotas(cuotasAmount);
    if (cuotasAmount > 1) this.openCuotasDrawer();
  }

  changeMultiplePorcentual(data: {
    multiple: boolean;
    porcentuales: { id: number; display: string }[];
  }) {
    if (data.multiple) {
      this.gastosForm.addPercentajesRow(data.porcentuales.length);
      this.openPorcentualesDrawer();
    } else {
      this.gastosForm.addPercentajesRow(0);
    }
  }

  searchDataForm(timeout = false) {
    const idProveedor: string = this.gastosForm.form.get('id_proveedor').value;
    const idConsorcio: string = this.gastosForm.form.get('consorcios').value;
    const idServicio: string = this.gastosForm.form.get('id_servicio').value;

    if (idProveedor == null || idConsorcio.length !== 1 || idServicio == null)
      return;

    if (this.timeout) window.clearTimeout(this.timeout);

    if (timeout) {
      this.timeout = window.setTimeout(() => {
        this.timeout = null;
        this.gastosService
          .findPrevious({
            id_proveedor: idProveedor,
            id_consorcio: idConsorcio[0],
            id_servicio: idServicio,
          })
          .subscribe(data => {
            if (!data) return;

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
          id_servicio: idServicio,
        })
        .subscribe(data => {
          if (!data) return;

          this.gastosForm.form.get('id_rubro').setValue(data.id_rubro);
          this.gastosForm.form.get('monto').setValue(data.monto);
          this.gastosForm.form.get('prevision').setValue(data.prevision);
          this.gastosForm.form.get('prorrateable').setValue(data.prorrateable);
          this.gastosForm.form.get('fecha').setValue(data.fecha);
        });
    }
  }
}
