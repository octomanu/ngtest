import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { COMPONENTS } from './components.index';
import { ROUTE_COMPONENTS } from './routes-components.index';
@NgModule({
  imports: [SharedModule, RouteRoutingModule, NgxDnDModule],
  declarations: [...COMPONENTS, ...ROUTE_COMPONENTS],
  entryComponents: COMPONENTS,
})
export class RoutesModule {}
