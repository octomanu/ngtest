import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateRef, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzDropdownContextComponent } from 'ng-zorro-antd';
import { NzDropdownService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styles: [
    `
      .search-box {
        padding: 8px;
      }

      .search-box input {
        width: 188px;
        margin-bottom: 8px;
        display: block;
      }

      .search-box button {
        width: 90px;
      }

      .search-button {
        margin-right: 8px;
      }
    `,
  ],
})
export class ProveedoresComponent implements OnInit {
  @ViewChild('proveedorForm') proveedorForm;
  visible = false;
  private dropdown: NzDropdownContextComponent;
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData = [];
  loading = true;
  sortValue: string | null = null;
  sortKey: string | null = null;
  searchGenderList: string[] = [];

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
      this.pageIndex = 1;
    }
    this.loading = true;
    this.randomUserService
      .getUsers(
        this.pageIndex,
        this.pageSize,
        this.sortKey!,
        this.sortValue!,
        this.searchGenderList,
      )
      .subscribe((data: any) => {
        this.loading = false;
        this.total = data.recordsFiltered;
        this.listOfData = data.data;
      });
  }

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value ? sort.value.replace('end', '') : sort.value;
    this.searchData();
  }

  updateFilter(value: string[]): void {
    this.searchGenderList = value;
    this.searchData(true);
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  eliminar(id: number) {
    this.randomUserService.eliminarProveedor(id).subscribe(data => {
      this.msg.success(`Eliminado!!`);
      this.searchData();
      this.cdr.detectChanges();
    });
  }

  onToggleForm(open: boolean) {
    if (open) {
      this.dropdown.close();
    }
  }

  onSubmitForm(status: boolean) {
    this.searchData();
  }
}
