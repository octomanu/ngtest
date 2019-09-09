import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { CuentaCorrienteConsorcioComponent } from './cuenta-corriente-consorcio.component';
import { CuentaCorrienteConsorcioEffects } from 'redux/cuenta-corriente-consorcio/cuenta-corriente-consorcio.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CuentaCorrienteConsorcioReducer } from 'redux/cuenta-corriente-consorcio/cuenta-corriente-consorcio.reducer';

const Effects = [CuentaCorrienteConsorcioEffects];

const Helpers = [];

export const routes: Routes = [
  {
    path: '',
    component: CuentaCorrienteConsorcioComponent,
    data: { title: 'Cuenta corriente de consorcios' },
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(
      'cuentaCorrienteConsorcio',
      CuentaCorrienteConsorcioReducer,
    ),
    EffectsModule.forFeature(Effects),
  ],
  declarations: [...COMPONENTS, CuentaCorrienteConsorcioComponent],
  entryComponents: COMPONENTS,
})
export class CuentaCorrienteConsorcioModule {}
