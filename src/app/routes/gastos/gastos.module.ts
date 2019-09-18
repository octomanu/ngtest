import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { GastosComponent } from './gastos.component';
import { TableRowComponent } from './gastos-table/table-row/table-row.component';
import { DrawerService } from '@shared/utils/drawer.service';
export const routes: Routes = [
  {
    path: '',
    component: GastosComponent,
    data: { title: 'Gastos' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, GastosComponent, TableRowComponent],
  providers: [DrawerService],
  entryComponents: COMPONENTS,
})
export class GastosModule {}
