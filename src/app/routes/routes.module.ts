import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { COMPONENTS } from './components.index';
import { ROUTE_COMPONENTS } from './routes-components.index';
import { ChequerasTagsComponent } from './chequeras/chequeras-tags/chequeras-tags.component';
import { ChequerasButtonsComponent } from './chequeras/chequeras-buttons/chequeras-buttons.component';
@NgModule({
  imports: [SharedModule, RouteRoutingModule, NgxDnDModule],
  declarations: [...COMPONENTS, ...ROUTE_COMPONENTS, ChequerasTagsComponent, ChequerasButtonsComponent],
  entryComponents: COMPONENTS,
})
export class RoutesModule {}
