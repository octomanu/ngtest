import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { COMPONENTS } from './components.index';
import { ROUTE_COMPONENTS } from './routes-components.index';
import { NzResultModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CabecerasModule } from './cabeceras/cabeceras.module';
@NgModule({
  imports: [
    SharedModule,
    RouteRoutingModule,
    NgxDnDModule,
    NzResultModule,
    BrowserAnimationsModule,
    CabecerasModule,
  ],
  declarations: [...COMPONENTS, ...ROUTE_COMPONENTS],
  entryComponents: COMPONENTS,
})
export class RoutesModule {}
