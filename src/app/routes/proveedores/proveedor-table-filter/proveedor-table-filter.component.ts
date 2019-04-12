import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FiltroForm } from '../proveedor-table/filtro.form';
import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-proveedor-table-filter',
  templateUrl: './proveedor-table-filter.component.html',
  styles: [],
})
export class ProveedorTableFilterComponent implements OnInit {
  form: FormGroup;
  @Input() formInput: { razon_social: string; direccion: string; cuit: string };

  constructor(
    private filtroForm: FiltroForm,
    private drawerRef: NzDrawerRef<{
      razon_social: string;
      direccion: string;
      cuit: string;
    }>,
  ) {}

  ngOnInit() {
    this.form = this.filtroForm.getForm();
    this.form.setValue(this.formInput);
  }

  submit() {
    this.drawerRef.close(this.form.value);
  }
}
