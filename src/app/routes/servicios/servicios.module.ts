import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { ServiciosComponent } from './servicios.component';
import { ServiciosEffects } from 'redux/servicios/servicios.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { serviciosReducer } from 'redux/servicios/servicios.reducer';

const Effects = [ServiciosEffects];

const Helpers = [];

export const routes: Routes = [
  {
    path: '',
    component: ServiciosComponent,
    data: { title: 'Servicios' },
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('servicios', serviciosReducer),
    EffectsModule.forFeature(Effects),
  ],
  declarations: [...COMPONENTS, ServiciosComponent],
  entryComponents: COMPONENTS,
})
export class ServiciosModule {}
