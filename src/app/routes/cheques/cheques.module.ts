import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { ChequesComponent } from './cheques.component';

export const routes: Routes = [
  {
    path: '',
    component: ChequesComponent,
    data: { title: 'Caja Consorcio' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, ChequesComponent],
  entryComponents: COMPONENTS,
})
export class ChequesModule {}
