import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { CuentaCorrienteProveedorComponent } from './cuenta-corriente-proveedor.component';
import { CuentaCorrienteProveedorEffects } from 'redux/cuenta-corriente-proveedor/cuenta-corriente-proveedor.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CuentaCorrienteProveedorReducer } from 'redux/cuenta-corriente-proveedor/cuenta-corriente-proveedor.reducer';

const Effects = [CuentaCorrienteProveedorEffects];

const Helpers = [];

export const routes: Routes = [
  {
    path: '',
    component: CuentaCorrienteProveedorComponent,
    data: { title: 'Cuenta corriente de proveedores' },
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(
      'cuentaCorrienteProveedor',
      CuentaCorrienteProveedorReducer,
    ),
    EffectsModule.forFeature(Effects),
  ],
  declarations: [...COMPONENTS, CuentaCorrienteProveedorComponent],
  entryComponents: COMPONENTS,
})
export class CuentaCorrienteProveedorModule {}
