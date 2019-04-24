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
  filtroForm = {
    razon_social: null,
    calle: null,
    numero: null,
    cuit: null,
    estado: null,
  };
  mapOfExpandData: { [key: string]: boolean } = {};
  private consorciosService: ConsorciosService;

  constructor(
    private msg: NzMessageService,
    private translate: TranslateService,
    private drawerService: NzDrawerService,
    consorciosService: ConsorciosService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(consorciosService, nzDropdownService, breakpointObserver);
    this.consorciosService = consorciosService;
    this.tags = {
      razon_social: { title: 'global.razon_social', used: false },
      calle: { title: 'global.calle', used: false },
      numero: { title: 'global.direccion', used: false },
      cuit: { title: 'global.cuit', used: false },
      estado: { title: 'global.estado', used: false },
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
        ConsorcioFormComponent,
        { id: number }
      >({
        nzTitle: res,
        nzWidth: this.initialDrawerWidth,
        nzContent: ConsorcioFormComponent,
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

  eliminar(id: number) {
    this.consorciosService.delete(id).subscribe(data => {
      this.msg.success(`Eliminado!!`);
      this.searchData();
    });
  }
}
