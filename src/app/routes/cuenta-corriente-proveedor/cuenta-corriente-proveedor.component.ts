import { Component, OnInit } from '@angular/core';
import { WrapComponent } from '../classes/WrapComponent.class';
import { CuentaCorrienteProveedorFormComponent } from './cuenta-corriente-proveedor-form/cuenta-corriente-proveedor-form.component';
@Component({
  selector: 'app-cuenta-corriente-proveedor',
  templateUrl: './cuenta-corriente-proveedor.component.html',
  styles: [],
})
export class CuentaCorrienteProveedorComponent extends WrapComponent {
  drawerTitle = 'global.cuenta_corriente_proveedor';
  drawerContent = CuentaCorrienteProveedorFormComponent;
}
