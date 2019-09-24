import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DescripcionesFinderService } from 'app/routes/services/type-ahead/descripciones-finder/descripciones-finder.service';
import { ProveedorFinderService } from 'app/routes/services/type-ahead/proveedor-finder/proveedor-finder.service';
import { ServiciosFinderService } from 'app/routes/services/type-ahead/servicios-finder/servicios-finder.service';
import { CategoriasFinderService } from 'app/routes/services/type-ahead/categorias-finder/categorias-finder.service';
import { FormArray, FormGroup } from '@angular/forms';
import { PorcentajesConsorciosService } from '@core/http/porcentajes_consorcios/porcentajes-consorcios.service';
import { UfFinderService } from 'app/routes/services/type-ahead/uf-finder/uf-finder.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: [],
  providers: [UfFinderService],
})
export class PrincipalComponent implements OnInit {
  @Output() updateConsorcio = new EventEmitter<number[]>();
  @Output() openPorcentuales = new EventEmitter<void>();
  @Output() openCuotas = new EventEmitter<void>();
  @Output() openProveedor = new EventEmitter<void>();
  @Output() multiPorcentual = new EventEmitter<{
    multiple: boolean;
    porcentuales: {}[];
  }>();
  @Output() changeCuotas = new EventEmitter<number>();
  @Input() form: FormGroup;

  descripcionsfilter = false;
  plantilla: number;
  factura: string = null;

  cuotasAmount = 1;
  multiPorcentajes = false;
  protected cuotas = [];
  protected current = 0;
  isLoading = true;

  porcentajes: { id: number; display: string }[] = [];
  protected timeout = null;
  protected keep = { proveedor: false, consorcio: false, gasto: false };
  protected initialized = false;
  constructor(
    public categoriasFinder: CategoriasFinderService,
    public porcentajesService: PorcentajesConsorciosService,
    public descripcionesSelect: DescripcionesFinderService,
    public proveedorSelect: ProveedorFinderService,
    public serviciosSelect: ServiciosFinderService,
    public categoriasSelect: CategoriasFinderService,
    public ufFinder: UfFinderService,
  ) {}
  ngOnInit() {}

  //DONE
  openCuotasDrawer() {
    this.openCuotas.emit();
  }
  //DONE
  openPorcentualesDrawer() {
    this.openPorcentuales.emit();
  }

  onChangeCuotas() {
    this.changeCuotas.emit(this.cuotasAmount);
  }

  submit() {}

  //DONE
  changeConsorcio() {
    this.multiPorcentajes = false;
    const ids = [...this.form.get('consorcios').value];
    const id = ids.length === 1 ? ids[0] : null;
    this.porcentajesService.setConsorcio(id);
    this.searchPorcentajesList('');
    this.updateConsorcio.emit(ids);
  }

  searchDataForm(timeout = false) {}

  //DONE
  changeMultiplePorcentual() {
    const value = {
      multiple: this.multiPorcentajes,
      porcentuales: [...this.porcentajes],
    };

    this.multiPorcentual.emit(value);
  }

  openProveedoresForm() {
    this.openProveedor.emit();
  }

  crearPlantilla() {
    // this.gastosForm.interactions.openGastosDescripcionesForm();
  }

  cargarPlantilla(id: number) {
    // this.gastosForm.loadDescription(id);
  }

  changeFactura() {
    const cuotas = this.form.get('cuotas') as FormArray;
    const value: any = cuotas.controls[0].value;
    value.numero_factura = this.factura;
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

  protected searchPorcentajesList(display: string) {
    this.porcentajesService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.porcentajes = data;
      });
  }
}
