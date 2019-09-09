import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { CajaConsorcioComponent } from './caja-consorcio.component';

export const routes: Routes = [
  {
    path: '',
    component: CajaConsorcioComponent,
    data: { title: 'Caja Consorcio' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, CajaConsorcioComponent],
  entryComponents: COMPONENTS,
})
export class CajaConsorcioModule {}
