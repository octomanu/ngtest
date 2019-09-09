import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { ConsorciosComponent } from './consorcios.component';

export const routes: Routes = [
  {
    path: '',
    component: ConsorciosComponent,
    data: { title: 'Consorcios' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, ConsorciosComponent],
  entryComponents: COMPONENTS,
})
export class ConsorciosModule {}
