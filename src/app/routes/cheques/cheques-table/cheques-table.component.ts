import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableLambe } from '@core/lambe/table-lambe.class';
import {
  NzMessageService,
  NzDrawerService,
  NzDropdownService,
} from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { ChequesService } from '@core/http/cheques/cheques.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ChequesTableFilterComponent } from '../cheques-table-filter/cheques-table-filter.component';
import { ChequesFormFields } from './interfaces/cheques-form-fields.interface';
import { ChequesFormComponent } from '../cheques-form/cheques-form.component';

@Component({
  selector: 'app-cheques-table',
  templateUrl: './cheques-table.component.html',
  styles: [],
})
export class ChequesTableComponent extends TableLambe
  implements OnInit, OnDestroy {
  filtroForm = {
    razon_social: null,
    calle: null,
    numero: null,
    cuit: null,
    estado: null,
  };
  mapOfExpandData: { [key: string]: boolean } = {};
  consorcioStatus = ['ACTIVO', 'PENDIENTE', 'INACTIVO', 'BORRADO'];
  private chequesService: ChequesService;

  constructor(
    private msg: NzMessageService,
    private translate: TranslateService,
    private drawerService: NzDrawerService,
    chequesService: ChequesService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(chequesService, nzDropdownService, breakpointObserver);
    this.chequesService = chequesService;
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
    console.log(id);
    this.translate.get('lambe.cheques').subscribe((res: string) => {
      this.drawerRef = this.drawerService.create<
        ChequesFormComponent,
        { id: number }
      >({
        nzTitle: res,
        nzWidth: this.initialDrawerWidth,
        nzContent: ChequesFormComponent,
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
      ChequesTableFilterComponent,
      { formInput: ChequesFormFields }
    >({
      nzTitle: 'lambe.proveedores.titulo',
      nzWidth: this.initialDrawerWidth,
      nzContent: ChequesTableFilterComponent,
      nzContentParams: { formInput: this.filtroForm },
    });

    this.drawerRef.afterClose.subscribe((data: any) => {
      if (!data) return;
      this.filtroForm = data;
      this.searchData();
    });
  }

  eliminar(id: number) {
    this.chequesService.delete(id).subscribe(data => {
      this.msg.success(`Eliminado!!`);
      this.searchData();
    });
  }
}
