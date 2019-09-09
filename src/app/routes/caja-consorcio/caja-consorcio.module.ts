import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { CajaConsorcioComponent } from './caja-consorcio.component';
import { CajaConsorcioEffects } from 'redux/caja-consorcio/caja-consorcio.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CajaConsorcioReducer } from 'redux/caja-consorcio/caja-consorcio.reducer';

const Effects = [CajaConsorcioEffects];

const Helpers = [];

export const routes: Routes = [
  {
    path: '',
    component: CajaConsorcioComponent,
    data: { title: 'Caja Consorcio' },
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('cajaConsorcio', CajaConsorcioReducer),
    EffectsModule.forFeature(Effects),
  ],
  declarations: [...COMPONENTS, CajaConsorcioComponent],
  entryComponents: COMPONENTS,
})
export class CajaConsorcioModule {}
