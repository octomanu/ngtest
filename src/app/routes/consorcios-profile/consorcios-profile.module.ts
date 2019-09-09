import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { ConsorciosProfileComponent } from './consorcios-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: ConsorciosProfileComponent,
    data: { title: 'Perfil de consorcio' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, ConsorciosProfileComponent],
  entryComponents: COMPONENTS,
})
export class ConsorciosProfileModule {}
