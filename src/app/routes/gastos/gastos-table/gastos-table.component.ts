import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableLambe } from '@core/lambe/table-lambe.class';
import {
  NzMessageService,
  NzDrawerService,
  NzDropdownService,
} from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { GastosService } from '@core/http/gastos/gastos.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { GastosFormComponent } from '../gastos-form/gastos-form.component';
import { GastosTableFilterComponent } from '../gastos-table-filter/gastos-table-filter.component';
import { Subject, Subscription } from 'rxjs';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
@Component({
  selector: 'app-gastos-table',
  templateUrl: './gastos-table.component.html',
  styles: [],
})
export class GastosTableComponent extends TableLambe
  implements OnInit, OnDestroy {
  filtroForm = {
    id_proveedor: null,
    id_consorcio: null,
    numero: null,
    cuit: null,
    estado: null,
  };

  extraData = false;
  protected table = {
    gasto: { show: true },
    id_proveedor: { show: true },
    id_consorcio: { show: true },
  };
  protected timeout = null;
  protected isLoading = false;
  protected submitForm = new Subject<{ submit: boolean }>();
  protected gastosService: GastosService;
  protected proveedores: { id: number; display: string }[];
  protected consorcios: { id: number; display: string }[];
  protected masterFilter = { proveedor: '', consorcio: '', gasto: '' };
  constructor(
    private msg: NzMessageService,
    private translate: TranslateService,
    private drawerService: NzDrawerService,
    gastosService: GastosService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
    protected proveedorService: ProveedoresService,
    protected consorciosService: ConsorciosService,
  ) {
    super(gastosService, nzDropdownService, breakpointObserver);
    this.gastosService = gastosService;
    this.tags = {
      id_proveedor: { title: 'lambe.proveedores.proveedor', used: false },
      id_consorcio: { title: 'lambe.consorcios.consorcio', used: false },
      numero: { title: 'global.direccion', used: false },
      cuit: { title: 'global.cuit', used: false },
      estado: { title: 'global.estado', used: false },
    };
  }

  ngOnInit(): void {
    this.searchData();
    this.searchConsorciosList('');
    this.searchProveedorList('');
    this.subscribeBreakPoint();
  }

  ngOnDestroy(): void {
    this.unsubscribeBreakPoint();
  }

  _openForm(id?: number) {
    const valueChangeSubscription = this.submitForm
      .asObservable()
      .subscribe(value => {
        this.searchData();
      });

    this.translate.get('lambe.cheques').subscribe((res: string) => {
      this.drawerRef = this.drawerService.create<
        GastosFormComponent,
        { id: number; valueChange: Subject<{ submit: boolean }> }
      >({
        nzTitle: res,
        nzWidth: this.initialDrawerWidth,
        nzContent: GastosFormComponent,
        nzContentParams: { id, valueChange: this.submitForm },
      });

      this.drawerRef.afterClose.subscribe(
        (data: { submit: boolean } | undefined) => {
          if (!data) return;
          if (data.submit) this.searchData();
          valueChangeSubscription.unsubscribe();
        },
      );

      this.drawerRef.afterOpen.subscribe(data => {
        this.closeMenu();
      });
    });
  }

  _openFilter() {
    this.drawerRef = this.drawerService.create<
      GastosTableFilterComponent
      // { formInput: ChequesFormFields }
    >({
      nzTitle: 'lambe.proveedores.titulo',
      nzWidth: this.initialDrawerWidth,
      nzContent: GastosTableFilterComponent,
      nzContentParams: {
        formInput: this.filtroForm,
      },
    });

    this.drawerRef.afterClose.subscribe((data: any) => {
      if (!data) return;
      this.filtroForm = data;
      this.searchData();
    });
  }

  eliminar(id: number) {
    this.gastosService.delete(id).subscribe(data => {
      this.msg.success(`Eliminado!!`);
      this.searchData();
    });
  }

  changeMasterFilter(filter: string, value: any) {
    this.filtroForm[filter] = value;
    if (value) {
      this.table[filter].show = false;
    } else {
      this.table[filter].show = true;
    }
    this.searchData();
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

  changeExtra(event: any){
  console.log(event);
  }

  protected searchProveedorList(display: string) {
    this.proveedorService
      .searchProveedor(display)
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
