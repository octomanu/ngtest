import { NgModule } from '@angular/core';
import { BancosComponent } from './bancos.component';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';

export const routes: Routes = [
  {
    path: '',
    component: BancosComponent,
    data: { title: 'Bancos' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, BancosComponent],
  entryComponents: COMPONENTS,
})
export class BancosModule {}
