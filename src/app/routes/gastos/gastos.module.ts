import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { GastosComponent } from './gastos.component';

export const routes: Routes = [
  {
    path: '',
    component: GastosComponent,
    data: { title: 'Gastos' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, GastosComponent],
  entryComponents: COMPONENTS,
})
export class GastosModule {}
