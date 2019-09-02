import { Component } from '@angular/core';
import { WrapComponent } from '../classes/WrapComponent.class';

@Component({
  selector: 'app-sueldos',
  templateUrl: './sueldos.component.html',
  styles: [],
})
export class SueldosComponent extends WrapComponent {
  drawerTitle = 'global.sueldos';
  drawerContent = '';
}
