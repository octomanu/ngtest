import { Component, OnInit } from '@angular/core';
import { WrapComponent } from '../classes/WrapComponent.class';

@Component({
  selector: 'app-caja-consorcio',
  templateUrl: './caja-consorcio.component.html',
  styles: []
})
export class CajaConsorcioComponent extends WrapComponent {
  drawerTitle = 'global.cuentas_bancarias';
  drawerContent = '';
}
