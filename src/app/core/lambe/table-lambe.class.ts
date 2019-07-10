import { TableLambeInterface } from 'app/interfaces/local/table-lambe.interface';
import { TableLambeServiceInterface } from 'app/interfaces/local/table-lambe-service.interface';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { TemplateRef, Output, EventEmitter } from '@angular/core';
import {
  NzDropdownService,
  NzDropdownContextComponent,
  NzDrawerRef,
} from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';

export class TableLambe implements TableLambeInterface {
  @Output() openForm = new EventEmitter();
  protected drawerRef: NzDrawerRef;
  protected breakpointRef: Subscription;
  protected initialDrawerWidth: string;

  protected _timeout = null;
  protected paginatorParams: PaginatorParamsInterface;
  tableLambe = { total: 1, data: [], loading: true };
  protected filtroForm: {};
  protected tags = {};
  protected dropdown: NzDropdownContextComponent;
  protected smallScreen: boolean;
  constructor(
    protected dataService: TableLambeServiceInterface | any,
    protected nzDropdownService: NzDropdownService,
    protected breakpointObserver: BreakpointObserver,
  ) {
    this.paginatorParams = {
      page: 1,
      page_size: 10,
      sort_field: '',
      sort_order: '',
    };
  }

  /**
   * Ordena los datos de la grilla
   *
   */
  sort(sort: { key: string; value: string }): void {
    this.paginatorParams.sort_field = sort.key;
    this.paginatorParams.sort_order = sort.value
      ? sort.value.replace('end', '')
      : sort.value;
    this.searchData();
  }

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
        this.tableLambe.loading = false;
        this.tableLambe.total = data.recordsFiltered;
        this.tableLambe.data = data.data;
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
      });
  }

  updateFilter(): void {
    this.searchData(true);
  }

  /**
   * Limpia filtros aplicados.
   */
  clearFilter(): void {
    this.filtroForm = { razon_social: '', direccion: '', cuit: '' };
    this.closeMenu();
    this.searchData();
  }

  /**
   * Dispara la busqueda despues del keyup del input
   */
  search(): void {
    if (this._timeout) {
      window.clearTimeout(this._timeout);
    }
    this._timeout = window.setTimeout(() => {
      this._timeout = null;
      this.searchData();
    }, 400);
  }

  /**
   * Emite el evento "open de un formulario"
   *
   */
  _openForm(id?: number): void {
    this.openForm.emit(id);
  }

  /**
   * Abre el menu contextual
   *
   */
  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  /**
   * Cierra el menu contectual
   *
   */
  closeMenu(): void {
    if (!this.dropdown) {
      return;
    }
    this.dropdown.close();
  }

  /**
   * Elimina un tag de filtro aplicado.
   *
   */
  onRemoveTag(filtro: string): void {
    this.filtroForm[filtro] = '';
    this.tags[filtro].used = false;
    this.searchData();
  }

  /**
   * Escucha cambios en el tamaño del viewport para cambiar el width del drawer
   */
  subscribeBreakPoint() {
    this.breakpointRef = this.breakpointObserver
      .observe(['(min-width: 768px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          // mayor a mediun
          this.initialDrawerWidth = '75%';
          this.smallScreen = false;
          if (this.drawerRef) {
            this.drawerRef.nzWidth = this.initialDrawerWidth;
          }
        } else {
          // menor a medium
          this.initialDrawerWidth = '100%';
          this.smallScreen = true;
          if (this.drawerRef) {
            this.drawerRef.nzWidth = this.initialDrawerWidth;
          }
        }
      });
  }
  /**
   * Termina la esucha a cambios en el tamaño del viewport
   */
  unsubscribeBreakPoint() {
    this.breakpointRef.unsubscribe();
  }
}
