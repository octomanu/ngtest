import {
  Component,
  OnInit,
  TemplateRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TableFacade } from '../facade/table.facade';

@Component({
  selector: 'app-juicios-table',
  templateUrl: './juicios-table.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JuiciosTableComponent implements OnInit {
  translations = {
    id_consorcio: 'global.consorcio',
    caratula: 'global.caratula',
    numero_expediente: 'global.numero_expediente',
    juzgado: 'global.juzgado',
  };
  constructor(public table: TableFacade) {}

  ngOnInit() {
    this.table.pageRequest();
  }

  onPageChange(page: number) {
    this.table.changePage(page);
  }

  onEdit(id: number) {
    this.table.edit(id);
  }

  onDelete(id: number) {
    this.table.delete(id);
  }

  onContextMenu($event: MouseEvent, template: TemplateRef<void>) {
    this.table.openContextualMenu($event, template);
  }

  sort(sort: { key: string; value: string }): void {
    const field = sort.key;
    const order = sort.value ? sort.value.replace('end', '') : sort.value;
    this.table.changeOrder(field, order);
  }

  onRemoveTag(tag: string) {
    this.table.clearFilter(tag);
  }
}
