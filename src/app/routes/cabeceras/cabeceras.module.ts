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
    EffectsModule.forFeature([
      CabecerasEffects,
      EditFormEffects,
      CreateFormEffects,
      DeleteEffects,
      FilterFormEffects,
    ]),
    RouterModule.forChild(cabecerasRoutes),
  ],
  declarations: [...COMPONENTS, CabecerasComponent],
  entryComponents: COMPONENTS,
})
export class CabecerasModule {}
