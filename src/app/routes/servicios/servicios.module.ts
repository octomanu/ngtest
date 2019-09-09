import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { ServiciosComponent } from './servicios.component';

export const routes: Routes = [
  {
    path: '',
    component: ServiciosComponent,
    data: { title: 'Servicios' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, ServiciosComponent],
  entryComponents: COMPONENTS,
})
export class ServiciosModule {}
