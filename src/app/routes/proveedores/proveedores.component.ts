import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NzDropdownContextComponent } from 'ng-zorro-antd';
import { NzDropdownService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ProveedorFormComponent } from './proveedor-form/proveedor-form.component';
import { ProveedorTableComponent } from './proveedor-table/proveedor-table.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styles: [],
})
export class ProveedoresComponent implements OnInit {
  @ViewChild('proveedorForm') proveedorForm: ProveedorFormComponent;
  @ViewChild('proveedorTable') proveedorTable: ProveedorTableComponent;
  private dropdown: NzDropdownContextComponent;

  ngOnInit(): void {}

  constructor(private nzDropdownService: NzDropdownService) {}

  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  tableOnOpenForm(id?: number) {
    this.proveedorForm.open(id);
  }

  onToggleForm(open: boolean) {
    this.proveedorTable.closeMenu();
  }

  formOnSubmit() {
    this.proveedorTable.searchData();
  }
}
