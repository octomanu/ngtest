import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { CajaConsorcioState } from 'redux/caja-consorcio/caja-consorcio.reducer';

@Component({
  selector: 'app-caja-consorcio-total',
  templateUrl: './caja-consorcio-total.component.html',
  styles: [],
})
export class CajaConsorcioTotalComponent implements OnInit {
  totales = {
    total: { monto: 0, titulo: 'global.total' },
    deuda: { monto: 0, titulo: 'global.deuda' },
    cheque: { monto: 0, titulo: 'global.cheque' },
    efectivo: { monto: 0, titulo: 'global.efectivo' },
    transferencia: { monto: 0, titulo: 'global.transferencia' },
    otros: { monto: 0, titulo: 'global.otros' },
  };
  constructor(public store: Store<AppState>) {}

  ngOnInit() {
    this.store
      .select('cajaConsorcioState')
      .subscribe((state: CajaConsorcioState) => {
        this.calculateSaldos(state.saldos);
      });
  }

  calculateSaldos(saldos: any) {
    const efectivo =
      parseInt(saldos.subtotal_efectivo.total_ingresos, 10) -
      parseInt(saldos.subtotal_efectivo.total_egresos, 10);

    const cheque =
      parseInt(saldos.subtotal_cheque.total_ingresos, 10) -
      parseInt(saldos.subtotal_cheque.total_egresos, 10);

    const transferencia =
      parseInt(saldos.subtotal_cuenta_bancaria.total_ingresos, 10) -
      parseInt(saldos.subtotal_cuenta_bancaria.total_egresos, 10);

    const totales =
      parseInt(saldos.totales.total_ingresos, 10) -
      parseInt(saldos.totales.total_egresos, 10);

    this.totales.efectivo.monto = efectivo;
    this.totales.cheque.monto = cheque;
    this.totales.transferencia.monto = transferencia;
    this.totales.total.monto = totales;
  }
}
