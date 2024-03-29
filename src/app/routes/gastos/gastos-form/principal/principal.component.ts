import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { DescripcionesFinderService } from 'app/routes/services/type-ahead/descripciones-finder/descripciones-finder.service';
import { ProveedorFinderService } from 'app/routes/services/type-ahead/proveedor-finder/proveedor-finder.service';
import { ServiciosFinderService } from 'app/routes/services/type-ahead/servicios-finder/servicios-finder.service';
import { CategoriasFinderService } from 'app/routes/services/type-ahead/categorias-finder/categorias-finder.service';
import { UfFinderService } from 'app/routes/services/type-ahead/uf-finder/uf-finder.service';
import { PorcentajesFinderService } from 'app/routes/services/type-ahead/porcentajes-finder/porcentajes-finder.service';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: [],
  providers: [
    UfFinderService,
    PorcentajesFinderService,
    CategoriasFinderService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrincipalComponent implements OnInit {
  @Input() initializer: Observable<any>;
  @Input() form: FormGroup;
  @Output() updateConsorcio = new EventEmitter<number[]>();
  @Output() openPorcentuales = new EventEmitter<void>();
  @Output() openCuotas = new EventEmitter<void>();
  @Output() openProveedor = new EventEmitter<void>();
  @Output() openPlantilla = new EventEmitter<void>();
  @Output() changeCuotas = new EventEmitter<number>();
  @Output() changePlantilla = new EventEmitter<number>();
  @Output() submit = new EventEmitter<void>();
  @Output() multiPorcentual = new EventEmitter<{
    multiple: boolean;
    porcentuales: {}[];
  }>();
  descripcionsfilter = false;
  plantilla: number;
  factura: string = null;
  cuotasAmount: number;
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

  get id() {
    return this.form.get('id').value;
  }

  ngOnInit(): void {
    this.initializer
      .pipe(
        first(),
        map(data => (data ? data.cuotas.length : 1)),
      )
      .subscribe(cuotas => (this.cuotasAmount = cuotas));
  }

  onSubmit() {
    this.factura = null;
    this.cuotasAmount = 1;
    this.submit.emit();
  }

  searchDataForm(timeout = false) {}

  crearPlantilla() {
    this.openPlantilla.emit();
  }

  cargarPlantilla(id: number) {
    this.changePlantilla.emit(id);
  }

  onChangeCuotas() {
    if (!this.cuotasAmount) return;
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
    if (this.multiPorcentajes) {
      this.form.get('id_concepto_gastos').setValue(null);
      this.form.get('unidades_funcionales').setValue(null);
    }

    this.multiPorcentual.emit({
      multiple: this.multiPorcentajes,
      porcentuales: this.porcentajesSelect.value,
    });
  }

  changeMonto(value: string) {
    if (!value) this.cuotasAmount = 1;
    this.onChangeCuotas();
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
    cuotas.controls[0].setValue(value);
  }
}
