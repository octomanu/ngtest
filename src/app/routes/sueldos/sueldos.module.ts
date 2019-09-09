import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { SueldosComponent } from './sueldos.component';
import { SueldosEffects } from 'redux/sueldos/sueldos.effects';
import { SueldosReducer } from 'redux/sueldos/sueldos.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

const Effects = [SueldosEffects];

const Helpers = [];

export const routes: Routes = [
  {
    path: '',
    component: SueldosComponent,
    data: { title: 'Sueldos' },
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('sueldos', SueldosReducer),
    EffectsModule.forFeature(Effects),
  ],
  declarations: [...COMPONENTS, SueldosComponent],
  entryComponents: COMPONENTS,
  providers: [...Helpers],
})
export class SueldosModule {}
