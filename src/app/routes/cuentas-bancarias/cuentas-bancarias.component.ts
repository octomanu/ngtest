import { Component } from '@angular/core';
import { WrapComponent } from '../classes/WrapComponent.class';
import { CuentasBancariasFormComponent } from './cuentas-bancarias-form/cuentas-bancarias-form.component';

@Component({
  selector: 'app-cuentas-bancarias',
  templateUrl: './cuentas-bancarias.component.html',
  styles: [],
})
export class CuentasBancariasComponent extends WrapComponent {
  drawerTitle = 'global.cuentas_bancarias';
  drawerContent = CuentasBancariasFormComponent;
}
