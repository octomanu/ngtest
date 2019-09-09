import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { CuentaCorrienteProveedorComponent } from './cuenta-corriente-proveedor.component';

export const routes: Routes = [
  {
    path: '',
    component: CuentaCorrienteProveedorComponent,
    data: { title: 'Cuenta corriente de proveedores' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, CuentaCorrienteProveedorComponent],
  entryComponents: COMPONENTS,
})
export class CuentaCorrienteProveedorModule {}
