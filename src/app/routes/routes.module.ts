import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { COMPONENTS } from './components.index';
import { ROUTE_COMPONENTS } from './routes-components.index';
import { GastosDescripcionesComponent } from './gastos-descripciones/gastos-descripciones.component';
import { GastosDescripcionesFormComponent } from './gastos-descripciones/gastos-descripciones-form/gastos-descripciones-form.component';

@NgModule({
  imports: [SharedModule, RouteRoutingModule, NgxDnDModule],
  declarations: [...COMPONENTS, ...ROUTE_COMPONENTS, GastosDescripcionesComponent, GastosDescripcionesFormComponent],
  entryComponents: COMPONENTS,
})
export class RoutesModule {}
