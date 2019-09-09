import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { EstadoFinancieroComponent } from './estado-financiero.component';

export const routes: Routes = [
  {
    path: '',
    component: EstadoFinancieroComponent,
    data: { title: 'Estado Financiero' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, EstadoFinancieroComponent],
  entryComponents: COMPONENTS,
})
export class EstadoFinancieroModule {}
