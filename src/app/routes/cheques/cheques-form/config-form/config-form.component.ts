import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styles: [],
})
export class ConfigFormComponent implements OnInit {
  @Input() keepData: {
    cruzado: boolean;
    a_la_orden: boolean;
    id_chequera: boolean;
    fecha_deposito: boolean;
    fecha_emision: boolean;
    monto: boolean;
    numero: boolean;
  };

  constructor(private drawerRef: NzDrawerRef) {}

  ngOnInit() {}

  close() {
    this.drawerRef.close(this.keepData);
  }
}
