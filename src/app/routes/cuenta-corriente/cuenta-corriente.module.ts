import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { CuentaCorrienteComponent } from './cuenta-corriente.component';

export const routes: Routes = [
  {
    path: '',
    component: CuentaCorrienteComponent,
    data: { title: 'Cuenta corriente' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, CuentaCorrienteComponent],
  entryComponents: COMPONENTS,
})
export class CuentaCorrienteModule {}
