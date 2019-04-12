import { TableLambeInterface } from 'app/interfaces/local/table-lambe.interface';
import { TableLambeServiceInterface } from 'app/interfaces/local/table-lambe-service.interface';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { TemplateRef, Output, EventEmitter } from '@angular/core';
import { NzDropdownService, NzDropdownContextComponent } from 'ng-zorro-antd';

export class TableLambe implements TableLambeInterface {
  @Output() openForm = new EventEmitter();
  _timeout = null;
  paginatorParams: PaginatorParamsInterface;
  tableLambe = { total: 1, data: [], loading: true };
  filtroForm: {};
  tags = {};
  dropdown: NzDropdownContextComponent;

  constructor(
    protected dataService: TableLambeServiceInterface,
    protected nzDropdownService: NzDropdownService,
  ) {
    this.paginatorParams = {
      page: 1,
      page_size: 10,
      sort_field: '',
      sort_order: '',
    };
  }

  sort(sort: { key: string; value: string }): void {
    this.paginatorParams.sort_field = sort.key;
    this.paginatorParams.sort_order = sort.value
      ? sort.value.replace('end', '')
      : sort.value;
    this.searchData();
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.paginatorParams.page = 1;
    }

    this.tableLambe.loading = true;
    this.dataService
      .paginar(this.paginatorParams, this.filtroForm)
      .subscribe((data: any) => {
        this.tableLambe.loading = false;
        this.tableLambe.total = data.recordsFiltered;
        this.tableLambe.data = data.data;

        for (let filtro in this.filtroForm) {
          if (this.filtroForm[filtro] !== '') {
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

  clearFilter(): void {
    this.filtroForm = { razon_social: '', direccion: '', cuit: '' };
    this.closeMenu();
    this.searchData();
  }

  search(): void {
    if (this._timeout) {
      window.clearTimeout(this._timeout);
    }
    this._timeout = window.setTimeout(() => {
      this._timeout = null;
      this.searchData();
    }, 400);
  }

  _openForm(id?: number): void {
    this.openForm.emit(id);
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  closeMenu(): void {
    this.dropdown.close();
  }

  onRemoveTag(filtro: string) {
    this.filtroForm[filtro] = '';
    this.tags[filtro].used = false;
    this.searchData();
  }
}
