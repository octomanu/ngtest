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
    EffectsModule.forFeature([CabecerasEffects, EditFormEffects]),
    RouterModule.forChild(cabecerasRoutes),
  ],
  declarations: [...COMPONENTS, CabecerasComponent],
  entryComponents: COMPONENTS,
})
export class CabecerasModule {}
