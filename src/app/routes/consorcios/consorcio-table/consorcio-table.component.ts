import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import {
  NzDropdownService,
  NzMessageService,
  NzDrawerService,
} from 'ng-zorro-antd';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { ConsorcioFormComponent } from '../consorcio-form/consorcio-form.component';
import { ConsorcioTableFilterComponent } from '../consorcio-table-filter/consorcio-table-filter.component';
import { ConsorciosFormFields } from './interfaces/consorcios-form-fields.interface';

@Component({
  selector: 'app-consorcio-table',
  templateUrl: './consorcio-table.component.html',
  styles: [],
})
export class ConsorcioTableComponent extends TableLambe
  implements OnInit, OnDestroy {
  drawerContent = ConsorcioFormComponent;
  drawerTitle = 'lambe.consorcio';

  filtroForm = {
    razon_social: null,
    calle: null,
    numero: null,
    cuit: null,
    estado: null,
  };
  mapOfExpandData: { [key: string]: boolean } = {};
  consorcioStatus = ['ACTIVO', 'PENDIENTE', 'INACTIVO', 'BORRADO'];

  constructor(
    msg: NzMessageService,
    translate: TranslateService,
    drawerService: NzDrawerService,
    consorciosService: ConsorciosService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(
      consorciosService,
      nzDropdownService,
      breakpointObserver,
      translate,
      drawerService,
      msg,
    );

    this.tags = {
      razon_social: { title: 'global.razon_social', used: false },
      calle: { title: 'global.calle', used: false },
      numero: { title: 'global.direccion', used: false },
      cuit: { title: 'global.cuit', used: false },
      estado: { title: 'global.estado', used: false },
    };
  }

  _openFilter() {
    this.drawerRef = this.drawerService.create<
      ConsorcioTableFilterComponent,
      { formInput: ConsorciosFormFields }
    >({
      nzTitle: 'lambe.proveedores.titulo',
      nzWidth: this.initialDrawerWidth,
      nzContent: ConsorcioTableFilterComponent,
      nzContentParams: { formInput: this.filtroForm },
    });

    this.drawerRef.afterClose.subscribe((data: any) => {
      if (!data) return;
      this.filtroForm = data;
      this.searchData();
    });
  }

  getNzColor(status: string) {
    switch (status) {
      case 'PENDIENTE':
        return 'processing';
      case 'ACTIVO':
        return 'success';
      case 'INACTIVO':
        return 'warning';
      case 'BORRADO':
        return 'error';
      default:
        return 'default';
    }
  }
}
