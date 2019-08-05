import { Component } from '@angular/core';
import { WrapComponent } from 'app/routes/classes/WrapComponent.class';

@Component({
  selector: 'app-cuentas-bancarias-form',
  templateUrl: './cuentas-bancarias-form.component.html',
  styles: [],
})
export class CuentasBancariasFormComponent {
  drawerTittle = 'global.cuentas-bancarias';
  drawerContent = CuentasBancariasFormComponent;
}
