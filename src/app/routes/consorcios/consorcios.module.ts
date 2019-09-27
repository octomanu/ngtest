import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { ConsorciosComponent } from './consorcios.component';
import { StoreModule } from '@ngrx/store';
import { consorciosReducers } from 'redux/consorcios/consorcios.reducer';
import { PreviewEffects } from 'redux/consorcios/preview/preview.effects';
import { EffectsModule } from '@ngrx/effects';
import { DrawerService } from '@shared/utils/drawer.service';

export const routes: Routes = [
  {
    path: '',
    component: ConsorciosComponent,
    data: { title: 'Consorcios' },
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('consorcios', consorciosReducers),
    EffectsModule.forFeature([PreviewEffects]),
  ],
  providers: [DrawerService],
  declarations: [...COMPONENTS, ConsorciosComponent],
  entryComponents: COMPONENTS,
})
export class ConsorciosModule {}
