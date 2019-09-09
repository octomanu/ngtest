import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { GastosDescripcionesComponent } from './gastos-descripciones.component';

export const routes: Routes = [
  {
    path: '',
    component: GastosDescripcionesComponent,
    data: { title: 'Descripciones de gastos' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, GastosDescripcionesComponent],
  entryComponents: COMPONENTS,
})
export class GastosDescripcionesModule {}
