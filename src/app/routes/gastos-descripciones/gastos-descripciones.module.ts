import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { GastosDescripcionesComponent } from './gastos-descripciones.component';
import { GastosDescripcionesEffects } from 'redux/gastos-descripciones/gastos-descripciones.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GastosDescripcionesReducer } from 'redux/gastos-descripciones/gastos-descripciones.reducer';

const Effects = [GastosDescripcionesEffects];

const Helpers = [];

export const routes: Routes = [
  {
    path: '',
    component: GastosDescripcionesComponent,
    data: { title: 'Descripciones de gastos' },
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('gastosDescripciones', GastosDescripcionesReducer),
    EffectsModule.forFeature(Effects),
  ],
  declarations: [...COMPONENTS, GastosDescripcionesComponent],
  entryComponents: COMPONENTS,
})
export class GastosDescripcionesModule {}
