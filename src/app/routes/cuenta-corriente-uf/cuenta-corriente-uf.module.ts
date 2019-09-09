import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { CuentaCorrienteUfComponent } from './cuenta-corriente-uf.component';
import { CuentaCorrienteUfEffects } from 'redux/cuenta-corriente-uf/cuenta-corriente-uf-effects';
import { StoreModule } from '@ngrx/store';
import { CuentaCorrienteUfReducer } from 'redux/cuenta-corriente-uf/cuenta-corriente-uf-reducer';
import { EffectsModule } from '@ngrx/effects';

const Effects = [CuentaCorrienteUfEffects];

const Helpers = [];

export const routes: Routes = [
  {
    path: '',
    component: CuentaCorrienteUfComponent,
    data: { title: 'Cuenta corriente de ufs' },
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('cuentaCorrienteUf', CuentaCorrienteUfReducer),
    EffectsModule.forFeature(Effects),
  ],
  declarations: [...COMPONENTS, CuentaCorrienteUfComponent],
  entryComponents: COMPONENTS,
  providers: [...Helpers],
})
export class CuentaCorrienteUfModule {}
