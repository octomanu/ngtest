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
import { Subject } from 'rxjs';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { GastosForm } from './gastos.form';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
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

  protected rowForm = [];

  extraData = false;
  table = {
    gasto: { show: true },
    id_proveedor: { show: true },
    id_consorcio: { show: true },
  };
  form: FormGroup;
  protected timeout = null;
  isLoading = false;
  protected gastosService: GastosService;
  proveedores: { id: number; display: string }[];
  consorcios: { id: number; display: string }[];
  masterFilter = { proveedor: '', consorcio: '', gasto: '' };
  constructor(
    msg: NzMessageService,
    translate: TranslateService,
    drawerService: NzDrawerService,
    gastosService: GastosService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
    protected proveedorService: ProveedoresService,
    protected consorciosService: ConsorciosService,
    protected fb: GastosForm,
  ) {
    super(
      gastosService,
      nzDropdownService,
      breakpointObserver,
      translate,
      drawerService,
      msg,
    );
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
    this.form = this.fb.getForm();
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

    this.translate.get('lambe.gasto').subscribe((res: string) => {
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

  changeExtra(event: any) {
    console.log(event);
  }

  showForm(i: number, event) {
    // click al imput asi que no hago nada.
    if (
      typeof event.path[0].attributes.formcontrolname === 'object' ||
      event.srcElement.classList[0] === 'ant-calendar-picker-input'
    ) {
      return;
    }

    if (this.rowForm[i].visible) {
      if (this.rowForm[i].form.valid && this.rowForm[i].form.touched) {
        const gastoId = this.rowForm[i].form.get('id').value;
        const gastoData = this.rowForm[i].form.value;
        gastoData.fecha = moment(gastoData.fecha).format('DD-MM-YYYY');
        this.gastosService
          .updateMontoFecha(gastoId, gastoData)
          .subscribe((resp: any) => {
            this.tableLambe.data[i]['gastos-monto'] = gastoData.monto;
            this.tableLambe.data[i]['gastos-fecha'] = gastoData.fecha;
          });
      }
      this.rowForm[i].visible = false;

      console.log('Click al que etsaba editando submit');
      return;
    } else {
      // le dio click a uno que esta oculto. Tengo que ver si estaba editando alguno otro y guardarlo
      // tslint:disable-next-line: forin
      for (const key in this.rowForm) {
        if (
          this.rowForm[key].form.valid &&
          this.rowForm[key].form.touched &&
          this.rowForm[key].visible
        ) {
          const gastoId = this.rowForm[key].form.get('id').value;
          const gastoData = this.rowForm[key].form.value;
          this.gastosService
            .update(gastoId, gastoData)
            .subscribe((resp: any) => {
              this.tableLambe.data[key]['gastos-monto'] = resp.data.monto;
              this.tableLambe.data[key]['gastos-fecha'] = moment(
                resp.data.fecha,
              ).format('DD-MM-YYYY');
              this.rowForm[key].visible = false;
            });
        } else {
          this.rowForm[key].visible = false;
        }
      }

      //inicializo el que le dio click
      this.rowForm[i].form = this.fb.getForm();
      const fechaValue = moment(
        this.tableLambe.data[i]['gastos-fecha'],
        'DD-MM-YYYY',
      ).toDate();
      console.log('la fecha de moent', fechaValue);
      this.rowForm[i].form.setValue({
        id: this.tableLambe.data[i]['gastos-id'],
        monto: this.tableLambe.data[i]['gastos-monto'],
        fecha: fechaValue,
      });
      this.rowForm[i].visible = true;
    }
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

  // OVERRIDE
  /**
   * Busca los datos al inico y despues de aplicar filtros y orden
   */
  searchData(reset: boolean = false): void {
    if (reset) {
      this.paginatorParams.page = 1;
    }

    this.tableLambe.loading = true;
    this.dataService
      .paginate(this.paginatorParams, this.filtroForm)
      .subscribe((data: any) => {
        this.tableLambe.total = data.recordsFiltered;
        this.tableLambe.data = data.data;
        console.log(data.data);
        for (const filtro in this.filtroForm) {
          if (
            this.filtroForm[filtro] !== null &&
            this.filtroForm[filtro] !== ''
          ) {
            this.tags[filtro].used = true;
          } else {
            this.tags[filtro].used = false;
          }
        }

        // tslint:disable-next-line: forin
        for (const key in data.data) {
          this.rowForm[key] = {
            visible: false,
            form: this.fb.getForm(),
          };
        }
        this.tableLambe.loading = false;
      });
  }
}
