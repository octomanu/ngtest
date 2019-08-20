import { Component } from '@angular/core';
import { WrapComponent } from '../classes/WrapComponent.class';

@Component({
  selector: 'app-cuenta-corriente-consorcio',
  templateUrl: './cuenta-corriente-consorcio.component.html',
  styles: [],
})
export class CuentaCorrienteConsorcioComponent extends WrapComponent {
  drawerTitle = 'global.cuenta_corriente_consorcio';
  drawerContent = CuentaCorrienteConsorcioComponent;
}
