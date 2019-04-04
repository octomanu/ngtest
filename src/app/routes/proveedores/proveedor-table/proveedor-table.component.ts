import { ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzDropdownService, NzMessageService } from 'ng-zorro-antd';
import { NzDropdownContextComponent } from 'ng-zorro-antd';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { ProveedorFormComponent } from '../proveedor-form/proveedor-form.component';

@Component({
  selector: 'app-proveedor-table',
  templateUrl: './proveedor-table.component.html',
  styles: [],
})
export class ProveedorTableComponent implements OnInit {
  @Output() openForm = new EventEmitter();
  @Input('proveedorForm') proveedorForm: ProveedorFormComponent;
  private dropdown: NzDropdownContextComponent;

  paginatorParams = { page: 1, page_size: 10, sort_field: '', sort_order: '' };
  tableLambe = { total: 1, data: [], loading: true };
  filtroForm = { razon_social: '', direccion: '', cuit: '' };

  ngOnInit(): void {
    this.searchData();
  }

  constructor(
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private randomUserService: ProveedoresService,
    private nzDropdownService: NzDropdownService,
  ) {}

  searchData(reset: boolean = false): void {
    if (reset) {
      this.paginatorParams.page = 1;
    }

    this.tableLambe.loading = true;
    this.randomUserService
      .getUsers(this.paginatorParams, this.filtroForm)
      .subscribe((data: any) => {
        this.tableLambe.loading = false;
        this.tableLambe.total = data.recordsFiltered;
        this.tableLambe.data = data.data;
      });
  }

  sort(sort: { key: string; value: string }): void {
    this.paginatorParams.sort_field = sort.key;
    this.paginatorParams.sort_order = sort.value
      ? sort.value.replace('end', '')
      : sort.value;
    this.searchData();
  }

  updateFilter(): void {
    this.searchData(true);
  }

  eliminar(id: number) {
    this.randomUserService.eliminarProveedor(id).subscribe(data => {
      this.msg.success(`Eliminado!!`);
      this.searchData();
      this.cdr.detectChanges();
    });
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  closeMenu(): void {
    this.dropdown.close();
  }

  _openForm(id?: number) {
    this.openForm.emit(id);
  }
}
