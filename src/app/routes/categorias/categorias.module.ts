import { NgModule } from '@angular/core';
import { PageEffects } from 'redux/categorias/page/page.efects';
import { EditFormEffects } from 'redux/categorias/edit-form/edit-form.effects';
import { CreateFormEffects } from 'redux/categorias/create-form/create-form.effects';
import { DeleteEffects } from 'redux/categorias/delete/delete.effects';
import { FilterFormEffects } from 'redux/categorias/filter-form/filter-form.effects';
import { EditFormEffectsHelper } from 'redux/categorias/edit-form/edit-form-effects.helper';
import { DeleteEffectsHelper } from 'redux/categorias/delete/delete-effects.helper';
import { CreateFormEffectsHelper } from 'redux/categorias/create-form/create-form-effects.helper';
import { Routes, RouterModule } from '@angular/router';
import { CategoriasComponent } from './categorias.component';
import { SharedModule } from '@shared';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DrawerService } from '@shared/utils/drawer.service';
import { COMPONENTS } from './components.index';
import { categoriasReducers } from 'redux/categorias/categorias.reducer';

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

export const routes: Routes = [
  {
    path: '',
    component: CategoriasComponent,
    data: { title: 'Categorias' },
  },
];

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('categorias', categoriasReducers),
    EffectsModule.forFeature(Effects),
    RouterModule.forChild(routes),
  ],
  declarations: [...COMPONENTS, CategoriasComponent],
  entryComponents: COMPONENTS,
  providers: [...Helpers, DrawerService],
})
export class CategoriasModule {}
