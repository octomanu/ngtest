import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { EmpleadosComponent } from './empleados.component';

export const routes: Routes = [
  {
    path: '',
    component: EmpleadosComponent,
    data: { title: 'Empleados' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, EmpleadosComponent],
  entryComponents: COMPONENTS,
})
export class EmpleadosModule {}
