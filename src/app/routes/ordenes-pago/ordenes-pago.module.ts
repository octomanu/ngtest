import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { OrdenesPagoComponent } from './ordenes-pago.component';
import { OrdenesPagoEffects } from 'redux/ordenes-pago/ordenes-pago.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OrdenesPagoReducer } from 'redux/ordenes-pago/ordenes-pago.reducer';

const Effects = [OrdenesPagoEffects];

const Helpers = [];

export const routes: Routes = [
  {
    path: '',
    component: OrdenesPagoComponent,
    data: { title: 'Ordenes de Pago' },
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('ordenesPago', OrdenesPagoReducer),
    EffectsModule.forFeature(Effects),
  ],
  declarations: [...COMPONENTS, OrdenesPagoComponent],
  entryComponents: COMPONENTS,
})
export class OrdenesPagoModule {}
