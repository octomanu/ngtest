import { NgModule } from '@angular/core';
import { JuiciosComponent } from './juicios.component';
import { SharedModule } from '@shared';
import { StoreModule } from '@ngrx/store';
import { juiciosReducers } from 'redux/juicios/juicios.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Routes } from '@angular/router';
import { COMPONENTS } from './components.index';
import { PageEffects } from 'redux/juicios/page/page.efects';
import { EditFormEffects } from 'redux/juicios/edit-form/edit-form.effects';
import { CreateFormEffects } from 'redux/juicios/create-form/create-form.effects';
import { DeleteEffects } from 'redux/juicios/delete/delete.effects';
import { FilterFormEffects } from 'redux/juicios/filter-form/filter-form.effects';
import { EditFormEffectsHelper } from 'redux/juicios/edit-form/edit-form-effects.helper';
import { DeleteEffectsHelper } from 'redux/juicios/delete/delete-effects.helper';
import { CreateFormEffectsHelper } from 'redux/juicios/create-form/create-form-effects.helper';
import { DrawerService } from '@shared/utils/drawer.service';
import { TableFacade } from './facade/table.facade';
import { ButtonsFacade } from './facade/buttons.facade';
import { FormFacade } from './facade/form.facade';
import { FilterFacade } from './facade/filter.facade';
import { ConsorciosFinderService } from '../services/type-ahead/consorcios-finder/consorcios-finder.service';
import { JuiciosForm } from './juicios-form/juicios.form';

const Effects = [
  PageEffects,
  EditFormEffects,
  CreateFormEffects,
  DeleteEffects,
  FilterFormEffects,
];

const Helpers = [
  EditFormEffectsHelper,
  DeleteEffectsHelper,
  CreateFormEffectsHelper,
];

const Selectors = [ConsorciosFinderService];

const Facades = [TableFacade, ButtonsFacade, FormFacade, FilterFacade];

const Forms = [JuiciosForm];

export const routes: Routes = [
  {
    path: '',
    component: JuiciosComponent,
    data: { title: 'Juicios' },
  },
];

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('juicios', juiciosReducers),
    EffectsModule.forFeature(Effects),
    RouterModule.forChild(routes),
  ],
  declarations: [...COMPONENTS, JuiciosComponent],
  entryComponents: COMPONENTS,
  providers: [...Helpers, ...Facades, ...Selectors, ...Forms, DrawerService],
})
export class JuiciosModule {}
