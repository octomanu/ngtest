import { Component, OnInit } from '@angular/core';
import { GastosTableFacade } from '../facade/gastos-table.facade';
@Component({
  selector: 'app-gastos-table',
  templateUrl: './gastos-table.component.html',
  styles: [],
})
export class GastosTableComponent implements OnInit {
  extraData = false;
  translations = {
    id_proveedor: 'lambe.proveedores.proveedor',
    id_consorcio: 'lambe.consorcios.consorcio',
    numero: 'global.direccion',
    cuit: 'global.cuit',
    estado: 'global.estado',
  };

  constructor(public table: GastosTableFacade) {}

  ngOnInit(): void {
    this.table.load();
  }

  removeTag(tag: string) {
    this.table.removeFilter(tag);
  }

  pageChange(page: number) {
    this.table.changePage(page);
  }

  sort(sort: { key: string; value: string }): void {
    const order = sort.value ? sort.value.replace('end', '') : sort.value;
    this.table.order(sort.key, order);
  }
}
