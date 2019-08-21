import { Component } from '@angular/core';
import { WrapComponent } from '../classes/WrapComponent.class';

@Component({
  selector: 'app-cuenta-corriente-uf',
  templateUrl: './cuenta-corriente-uf.component.html',
  styles: [],
})
export class CuentaCorrienteUfComponent extends WrapComponent {
  drawerTitle = 'global.cuenta_corriente_uf';
  drawerContent = CuentaCorrienteUfComponent;
}
