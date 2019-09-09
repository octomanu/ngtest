import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { CuentaCorrienteUfComponent } from './cuenta-corriente-uf.component';

export const routes: Routes = [
  {
    path: '',
    component: CuentaCorrienteUfComponent,
    data: { title: 'Cuenta corriente de ufs' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, CuentaCorrienteUfComponent],
  entryComponents: COMPONENTS,
})
export class CuentaCorrienteUfModule {}
