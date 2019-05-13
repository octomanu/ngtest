import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NzDropdownService,
  NzMessageService,
  NzDrawerService,
} from 'ng-zorro-antd';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { ProveedorFormComponent } from '../proveedor-form/proveedor-form.component';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { ProveedorTableFilterComponent } from '../proveedor-table-filter/proveedor-table-filter.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ProveedoresFormFields } from './interfaces/proveedores-form-fields.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-proveedor-table',
  templateUrl: './proveedor-table.component.html',
  styles: [],
})
export class ProveedorTableComponent extends TableLambe
  implements OnInit, OnDestroy {
  mapOfExpandData: { [key: string]: boolean } = {};
  filtroForm = { razon_social: null, direccion: null, cuit: null };

  private proveedoresService: ProveedoresService;

  constructor(
    private msg: NzMessageService,
    private translate: TranslateService,
    private drawerService: NzDrawerService,
    nzDropdownService: NzDropdownService,
    proveedoresService: ProveedoresService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(proveedoresService, nzDropdownService, breakpointObserver);
    this.proveedoresService = proveedoresService;
    this.tags = {
      razon_social: { title: 'global.razon_social', used: false },
      direccion: { title: 'global.direccion', used: false },
      cuit: { title: 'global.cuit', used: false },
    };
  }

  ngOnInit(): void {
    this.searchData();
    this.subscribeBreakPoint();
  }

  ngOnDestroy(): void {
    this.unsubscribeBreakPoint();
  }

  _openForm(id?: number) {
    this.translate.get('lambe.proveedores.titulo').subscribe((res: string) => {
      this.drawerRef = this.drawerService.create<
        ProveedorFormComponent,
        { id: number }
      >({
        nzTitle: res,
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
    });
  }

  _openFilter() {
    this.drawerRef = this.drawerService.create<
      ProveedorTableFilterComponent,
      { formInput: ProveedoresFormFields }
    >({
      nzTitle: 'lambe.proveedores.titulo',
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
    this.proveedoresService.delete(id).subscribe(data => {
      this.msg.success(`Eliminado!!`);
      this.searchData();
    });
  }
}
