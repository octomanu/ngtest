import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { ProveedoresComponent } from './proveedores.component';

export const routes: Routes = [
  {
    path: '',
    component: ProveedoresComponent,
    data: { title: 'Proveedores' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, ProveedoresComponent],
  entryComponents: COMPONENTS,
})
export class ProveedoresModule {}
