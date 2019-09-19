import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { GastosComponent } from './gastos.component';
import { TableRowComponent } from './gastos-table/table-row/table-row.component';
import { DrawerService } from '@shared/utils/drawer.service';
import { gastosReducers } from 'redux/gastos/gastos.reducer';
import { StoreModule } from '@ngrx/store';
import { PageEffects } from 'redux/gastos/page/page.efects';
import { FilterFormEffects } from 'redux/gastos/filter-form/filter-form.effects';
import { EffectsModule } from '@ngrx/effects';
import { CreateFormEffects } from 'redux/gastos/create-form/create-form.effects';
import { CreateFormEffectsHelper } from 'redux/gastos/create-form/create-form-effects.helper';
import { DeleteEffectsHelper } from 'redux/gastos/delete/delete-effects.helper';
import { DeleteEffects } from 'redux/gastos/delete/delete.effects';
import { GastosButtonsComponent } from './gastos-buttons/gastos-buttons.component';
import { GastosTagsComponent } from './gastos-tags/gastos-tags.component';

const Effects = [
  PageEffects,
  FilterFormEffects,
  CreateFormEffects,
  DeleteEffects,
];

const Helpers = [CreateFormEffectsHelper, DeleteEffectsHelper];

export const routes: Routes = [
  {
    path: '',
    component: GastosComponent,
    data: { title: 'Gastos' },
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('gastos', gastosReducers),
    EffectsModule.forFeature(Effects),
  ],
  declarations: [...COMPONENTS, GastosComponent, TableRowComponent, GastosButtonsComponent, GastosTagsComponent],
  providers: [...Helpers, DrawerService],
  entryComponents: COMPONENTS,
})
export class GastosModule {}
