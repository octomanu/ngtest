import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CabecerasEffects } from 'redux/cabeceras/cabeceras.effects';
import { COMPONENTS } from './components.index';
import { Routes, RouterModule } from '@angular/router';
import { CabecerasComponent } from './cabeceras.component';
import { SharedModule } from '@shared';
import { cabeceraReducers } from 'redux/cabeceras/cabeceras.reducer';
import { EditFormEffects } from 'redux/cabeceras/edit-form/edit-form.effects';
import { CreateFormEffects } from 'redux/cabeceras/create-form/create-form.effects';
import { DeleteEffects } from 'redux/cabeceras/delete/delete.effects';
import { FilterFormEffects } from 'redux/cabeceras/filter-form/filter-form.effects';
import { CabecerasEffectsHelper } from 'redux/cabeceras/cabeceras-effects.helper';
import { FilterFormEffectsHelper } from 'redux/cabeceras/filter-form/filter-form-effects.helpet';
import { EditFormEffectsHelper } from 'redux/cabeceras/edit-form/edit-form-effects.helper';
import { DeleteEffectsHelper } from 'redux/cabeceras/delete/delete-effects.helper';
import { CreateFormEffectsHelper } from 'redux/cabeceras/create-form/create-form-effects.helper';

const Effects = [
  CabecerasEffects,
  EditFormEffects,
  CreateFormEffects,
  DeleteEffects,
  FilterFormEffects,
];

const Helpers = [
  CabecerasEffectsHelper,
  FilterFormEffectsHelper,
  EditFormEffectsHelper,
  DeleteEffectsHelper,
  CreateFormEffectsHelper,
];

export const cabecerasRoutes: Routes = [
  {
    path: '',
    component: CabecerasComponent,
    data: { title: 'Cabeceras' },
  },
];

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('cabeceras', cabeceraReducers),
    EffectsModule.forFeature(Effects),
    RouterModule.forChild(cabecerasRoutes),
  ],
  declarations: [...COMPONENTS, CabecerasComponent],
  entryComponents: COMPONENTS,
  providers: [...Helpers],
})
export class CabecerasModule {}
