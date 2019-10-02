import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { ChequesComponent } from './cheques.component';
import { ChequesTercerosFormModule } from './cheques-terceros-form/cheques-terceros-form.module';

export const routes: Routes = [
  {
    path: '',
    component: ChequesComponent,
    data: { title: 'Caja Consorcio' },
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ChequesTercerosFormModule,
  ],
  declarations: [...COMPONENTS, ChequesComponent],
  entryComponents: COMPONENTS,
})
export class ChequesModule {}
