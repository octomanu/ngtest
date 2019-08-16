import { Component } from '@angular/core';
import { OrdenesPagoService } from '@core/http/ordenes_pago/ordenes-pago.service';
import { NzDrawerRef } from 'ng-zorro-antd';
@Component({
  selector: 'app-ordenes-pago-form',
  templateUrl: './ordenes-pago-form.component.html',
  styles: [],
})
export class OrdenesPagoFormComponent {
  formData: {
    valid: boolean;
    value: any;
  };
  paginatorParams: {
    page: number;
    page_size: number;
    sort_field: string;
    sort_order: string;
  };
  totalOrden: number;
  facturas: any[];
  currentTab: number;

  constructor(
    public ordenesPago: OrdenesPagoService,
    public drawerRef: NzDrawerRef,
  ) {
    this.init();
  }

  submit() {
    const orden = {
      id_consorcio: this.formData.value.id_consorcio,
      id_proveedor: this.formData.value.id_proveedor,
      descripcion: this.formData.value.descripcion,
      valor: this.totalOrden,
      fecha: '12-12-2019',
      facturas: this.facturas,
    };

    this.ordenesPago.create(orden).subscribe(resp => {
      this.currentTab = 2;
    });
  }

  moveTab() {
    this.currentTab === 0 ? this.currentTab++ : this.currentTab--;
  }

  init() {
    this.totalOrden = 0;
    this.facturas = [];
    this.currentTab = 0;
    this.paginatorParams = {
      page: 1,
      page_size: 10,
      sort_field: null,
      sort_order: null,
    };
    this.formData = {
      valid: false,
      value: {
        id: null,
        id_consorcio: null,
        id_proveedor: null,
        descripcion: null,
      },
    };
  }
}
