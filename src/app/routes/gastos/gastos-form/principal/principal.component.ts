import { Component, Output, EventEmitter, Input } from '@angular/core';
import { DescripcionesFinderService } from 'app/routes/services/type-ahead/descripciones-finder/descripciones-finder.service';
import { ProveedorFinderService } from 'app/routes/services/type-ahead/proveedor-finder/proveedor-finder.service';
import { ServiciosFinderService } from 'app/routes/services/type-ahead/servicios-finder/servicios-finder.service';
import { CategoriasFinderService } from 'app/routes/services/type-ahead/categorias-finder/categorias-finder.service';
import { FormArray, FormGroup } from '@angular/forms';
import { UfFinderService } from 'app/routes/services/type-ahead/uf-finder/uf-finder.service';
import { PorcentajesFinderService } from 'app/routes/services/type-ahead/porcentajes-finder/porcentajes-finder.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: [],
  providers: [UfFinderService, PorcentajesFinderService],
})
export class PrincipalComponent {
  @Input() form: FormGroup;
  @Output() updateConsorcio = new EventEmitter<number[]>();
  @Output() openPorcentuales = new EventEmitter<void>();
  @Output() openCuotas = new EventEmitter<void>();
  @Output() openProveedor = new EventEmitter<void>();
  @Output() openPlantilla = new EventEmitter<void>();
  @Output() changeCuotas = new EventEmitter<number>();
  @Output() changePlantilla = new EventEmitter<number>();
  @Output() multiPorcentual = new EventEmitter<{
    multiple: boolean;
    porcentuales: {}[];
  }>();

  descripcionsfilter = false;
  plantilla: number;
  factura: string = null;
  cuotasAmount = 1;
  multiPorcentajes = false;

  protected keep = { proveedor: false, consorcio: false, gasto: false };
  protected initialized = false;
  constructor(
    public descripcionesSelect: DescripcionesFinderService,
    public proveedorSelect: ProveedorFinderService,
    public serviciosSelect: ServiciosFinderService,
    public categoriasSelect: CategoriasFinderService,
    public porcentajesSelect: PorcentajesFinderService,
    public ufFinder: UfFinderService,
  ) {}

  submit() {}

  searchDataForm(timeout = false) {}

  crearPlantilla() {
    this.openPlantilla.emit();
    // this.gastosForm.interactions.openGastosDescripcionesForm();
  }

  cargarPlantilla(id: number) {
    this.changePlantilla.emit(id);
    // this.gastosForm.loadDescription(id);
  }

  // DONE

  onChangeCuotas() {
    this.changeCuotas.emit(this.cuotasAmount);
  }

  openProveedoresForm() {
    this.openProveedor.emit();
  }

  openCuotasDrawer() {
    this.openCuotas.emit();
  }

  openPorcentualesDrawer() {
    this.openPorcentuales.emit();
  }

  changeMultiplePorcentual() {
    this.multiPorcentual.emit({
      multiple: this.multiPorcentajes,
      porcentuales: this.porcentajesSelect.value,
    });
  }

  changeConsorcio() {
    this.multiPorcentajes = false;
    const ids = [...this.form.get('consorcios').value];
    const id = ids.length === 1 ? ids[0] : null;
    this.porcentajesSelect.idConsorcio = id;
    this.updateConsorcio.emit(ids);
  }

  changeFactura() {
    const cuotas = this.form.get('cuotas') as FormArray;
    const value: any = cuotas.controls[0].value;
    value.numero_factura = this.factura;
  }
}
