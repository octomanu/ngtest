import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { GastosCuotasService } from '@core/http/gastos-cuotas/gastos-cuotas.service';

@Component({
  selector: 'app-facturas-tab',
  templateUrl: './facturas-tab.component.html',
  styles: [],
})
export class FacturasTabComponent implements OnInit {
  @Output() total: EventEmitter<number> = new EventEmitter();
  @Output() facturas: EventEmitter<number[]> = new EventEmitter();
  @Input() initTotal: number;
  @Input() initFacturas: number[];
  tableLambe = { total: 1, data: [], loading: true };
  facturas$: number[] = [];
  total$ = 0;

  paginatorParams = {
    page: 1,
    page_size: 5,
    sort_field: null,
    sort_order: null,
  };
  constructor(public gastosCuotasService: GastosCuotasService) {}

  ngOnInit() {
    this.facturas$ = this.initFacturas;
    this.total$ = this.initTotal;
    this.searchData();
  }

  searchData() {
    this.gastosCuotasService
      .paginate(this.paginatorParams, {})
      .subscribe((data: any) => {
        this.tableLambe.total = data.recordsFiltered;
        this.tableLambe.data = data.data;
        this.tableLambe.loading = false;
      });
  }

  toggleFactura(idFactura: number, monto: string) {
    const index = this.facturas$.indexOf(idFactura);
    const float = parseFloat(monto);

    if (index === -1) {
      this.facturas$.push(idFactura);
      this.total$ = (this.total$ * 10 + float * 10) / 10;
    } else {
      this.facturas$.splice(index, 1);
      this.total$ = (this.total$ * 10 - float * 10) / 10;
    }
    this.total$ = parseFloat(this.total$.toFixed(2));
    this.total.emit(this.total$);
    this.facturas.emit(this.facturas$);
  }
}
