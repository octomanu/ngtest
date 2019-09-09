import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { ChequerasComponent } from './chequeras.component';

export const routes: Routes = [
  {
    path: '',
    component: ChequerasComponent,
    data: { title: 'Caja Consorcio' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, ChequerasComponent],
  entryComponents: COMPONENTS,
})
export class ChequerasModule {}
