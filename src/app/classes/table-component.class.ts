import { Input, OnDestroy } from '@angular/core';
import { PaginatorParamsInterface } from 'app/interfaces/local/paginator-params.interface';
import { Subscription } from 'rxjs';
import { NzDropdownContextComponent } from 'ng-zorro-antd';

export abstract class TableComponent implements OnDestroy {
  @Input() help: boolean;
  @Input() keepHelp: boolean;
  tableLambe = { total: 1, data: [], loading: true };
  paginatorParams: PaginatorParamsInterface;
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
