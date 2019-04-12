import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  NzDropdownService,
  NzMessageService,
  NzDrawerService,
  NzDrawerRef,
} from 'ng-zorro-antd';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { ProveedorFormComponent } from '../proveedor-form/proveedor-form.component';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { ProveedorTableFilterComponent } from '../proveedor-table-filter/proveedor-table-filter.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-proveedor-table',
  templateUrl: './proveedor-table.component.html',
  styles: [],
})
export class ProveedorTableComponent extends TableLambe implements OnInit {
  @Input('proveedorForm')
  proveedorForm: ProveedorFormComponent;
  private proveedoresService: ProveedoresService;
  private drawerRef: NzDrawerRef;
  private initialDrawerWidth: string;
  filtroForm = { razon_social: '', direccion: '', cuit: '' };
  tags = {
    razon_social: { title: 'lambe.proveedores.razon_social', used: false },
    direccion: { title: 'lambe.proveedores.direccion', used: false },
    cuit: { title: 'lambe.proveedores.cuit', used: false },
  };

  ngOnInit(): void {
    this.searchData();
    this.breakpointObserver
      .observe(['(min-width: 758px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          // mayor a mediun
          this.initialDrawerWidth = '65%';
          if (this.drawerRef) {
            this.drawerRef.nzWidth = this.initialDrawerWidth;
          }
        } else {
          // menor a medium
          this.initialDrawerWidth = '100%';
          if (this.drawerRef) {
            this.drawerRef.nzWidth = this.initialDrawerWidth;
          }
        }
      });
  }

  constructor(
    private msg: NzMessageService,
    nzDropdownService: NzDropdownService,
    proveedoresService: ProveedoresService,
    private drawerService: NzDrawerService,
    public breakpointObserver: BreakpointObserver,
  ) {
    super(proveedoresService, nzDropdownService);
    this.proveedoresService = proveedoresService;
  }

  _openForm(id?: number) {
    this.drawerRef = this.drawerService.create<
      ProveedorFormComponent,
      { id: number }
    >({
      nzTitle: 'Component',
      nzWidth: this.initialDrawerWidth,
      nzContent: ProveedorFormComponent,
      nzContentParams: { id },
    });

    this.drawerRef.afterClose.subscribe(
      (data: { submit: boolean } | undefined) => {
        if (!data) return;
        if (data.submit) this.searchData();
      },
    );

    this.drawerRef.afterOpen.subscribe(data => {
      this.closeMenu();
    });
  }

  _openFilter() {
    this.drawerRef = this.drawerService.create<
      ProveedorTableFilterComponent,
      { formInput: { razon_social: string; direccion: string; cuit: string } }
    >({
      nzTitle: 'Component',
      nzWidth: this.initialDrawerWidth,
      nzContent: ProveedorTableFilterComponent,
      nzContentParams: { formInput: this.filtroForm },
    });

    this.drawerRef.afterClose.subscribe((data: any) => {
      if (!data) return;
      this.filtroForm = data;
      this.searchData();
    });
  }

  eliminar(id: number) {
    this.proveedoresService.eliminarProveedor(id).subscribe(data => {
      this.msg.success(`Eliminado!!`);
      this.searchData();
    });
  }
}
