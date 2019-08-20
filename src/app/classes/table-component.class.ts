import { Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { Subscription } from 'rxjs';
import { NzDropdownContextComponent } from 'ng-zorro-antd';

export abstract class TableComponent implements OnDestroy {
  @Input() help: boolean;
  @Input() keepHelp: boolean;
  @Output() openForm = new EventEmitter<number>();
  tableLambe = { total: 1, data: [], loading: true };
  paginatorParams = {
    page: null,
    page_size: null,
    sort_field: null,
    sort_order: null,
  };
  subscripctions: Subscription[] = [];
  dropdown: NzDropdownContextComponent;

  sort(sort: { key: string; value: string }): void {
    const field = sort.key;
    const order = sort.value ? sort.value.replace('end', '') : sort.value;
    this.changeOrder(field, order);
  }

  ngOnDestroy() {
    this.subscripctions.map((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  changeOrder(field: string, order: string) {
    throw new Error(
      'Implemente el metodo changeOrder para que dispare el reducer correspondiente',
    );
  }
}
