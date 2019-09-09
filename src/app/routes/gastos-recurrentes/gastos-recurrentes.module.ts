import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { GastosRecurrentesComponent } from './gastos-recurrentes.component';

export const routes: Routes = [
  {
    path: '',
    component: GastosRecurrentesComponent,
    data: { title: 'Notas' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, GastosRecurrentesComponent],
  entryComponents: COMPONENTS,
})
export class GastosRecurrentesModule {}
