import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { CuentaCorrienteConsorcioComponent } from './cuenta-corriente-consorcio.component';

export const routes: Routes = [
  {
    path: '',
    component: CuentaCorrienteConsorcioComponent,
    data: { title: 'Cuenta corriente de consorcios' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, CuentaCorrienteConsorcioComponent],
  entryComponents: COMPONENTS,
})
export class CuentaCorrienteConsorcioModule {}
