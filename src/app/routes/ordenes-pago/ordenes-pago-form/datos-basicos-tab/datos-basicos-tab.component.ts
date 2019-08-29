import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-basicos-tab',
  templateUrl: './datos-basicos-tab.component.html',
  styles: [],
})
export class DatosBasicosTabComponent implements OnInit, OnDestroy {
  @Input() formData: {
    id: number;
    id_consorcio: number;
    id_proveedor: number;
    descripcion: string;
  };
  @Output() formValue = new EventEmitter();

  isLoading = true;
  proveedores: { id: number; display: string }[];
  consorcios: { id: number; display: string }[];
  timeout = null;
  form: FormGroup;

  constructor(
    public proveedorService: ProveedoresService,
    public consorciosService: ConsorciosService,
    public fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.initForm();
    this.searchProveedorList('');
    this.searchConsorciosList('');
  }
  ngOnDestroy() {
    this.formValue.emit({ value: this.form.value, valid: this.form.valid });
  }

  initForm() {
    this.form = this.fb.group({
      id: [this.formData.id, []],
      id_consorcio: [this.formData.id_consorcio, [Validators.required]],
      id_proveedor: [this.formData.id_proveedor, [Validators.required]],
      descripcion: [this.formData.descripcion, [Validators.required]],
    });
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

  protected searchProveedorList(display: string) {
    this.proveedorService
      .searchByDisplay(display)
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
}
