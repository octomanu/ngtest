import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { ChequerasComponent } from './chequeras.component';
import { ChequerasEffects } from 'redux/chequeras/chequeras.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ChequerasReducer } from 'redux/chequeras/chequeras.reducer';

const Effects = [ChequerasEffects];

const Helpers = [];

export const routes: Routes = [
  {
    path: '',
    component: ChequerasComponent,
    data: { title: 'Chequeras' },
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('chequeras', ChequerasReducer),
    EffectsModule.forFeature(Effects),
  ],
  declarations: [...COMPONENTS, ChequerasComponent],
  entryComponents: COMPONENTS,
})
export class ChequerasModule {}
