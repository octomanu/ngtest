import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { OrdenesPagoComponent } from './ordenes-pago.component';

export const routes: Routes = [
  {
    path: '',
    component: OrdenesPagoComponent,
    data: { title: 'Ordenes de Pago' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, OrdenesPagoComponent],
  entryComponents: COMPONENTS,
})
export class OrdenesPagoModule {}
