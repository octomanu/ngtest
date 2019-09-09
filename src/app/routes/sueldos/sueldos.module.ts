import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { SueldosComponent } from './sueldos.component';

export const routes: Routes = [
  {
    path: '',
    component: SueldosComponent,
    data: { title: 'Sueldos' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, SueldosComponent],
  entryComponents: COMPONENTS,
})
export class SueldosModule {}
