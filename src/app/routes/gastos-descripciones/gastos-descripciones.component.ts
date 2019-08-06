import { Component } from '@angular/core';
import { WrapComponent } from '../classes/WrapComponent.class';
import { GastosDescripcionesFormComponent } from './gastos-descripciones-form/gastos-descripciones-form.component';

@Component({
  selector: 'app-gastos-descripciones',
  templateUrl: './gastos-descripciones.component.html',
  styles: [],
})
export class GastosDescripcionesComponent extends WrapComponent {
  drawerTitle = 'global.gastos_descripciones';
  drawerContent = GastosDescripcionesFormComponent;
}
