import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { COMPONENTS } from './components.index';
import { ROUTE_COMPONENTS } from './routes-components.index';
import { NzResultModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicInformationTabComponent } from './sueldos/sac-form/basic-information-tab/basic-information-tab.component';
import { ExtraHoursTabComponent } from './sueldos/sac-form/extra-hours-tab/extra-hours-tab.component';
import { PreviewTabComponent } from './sueldos/sac-form/preview-tab/preview-tab.component';
import { SueldosTableComponent } from './sueldos/sueldos-table/sueldos-table.component';
@NgModule({
  imports: [
    SharedModule,
    RouteRoutingModule,
    NgxDnDModule,
    NzResultModule,
    BrowserAnimationsModule,
  ],
  declarations: [...COMPONENTS, ...ROUTE_COMPONENTS, BasicInformationTabComponent, ExtraHoursTabComponent, PreviewTabComponent, SueldosTableComponent],
  entryComponents: COMPONENTS,
})
export class RoutesModule {}
