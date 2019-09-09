import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { PeriodosComponent } from './periodos.component';

export const routes: Routes = [
  {
    path: '',
    component: PeriodosComponent,
    data: { title: 'Periodos' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, PeriodosComponent],
  entryComponents: COMPONENTS,
})
export class PeriodosModule {}
