import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { NotasComponent } from './notas.component';

export const routes: Routes = [
  {
    path: '',
    component: NotasComponent,
    data: { title: 'Notas' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, NotasComponent],
  entryComponents: COMPONENTS,
})
export class NotasModule {}
