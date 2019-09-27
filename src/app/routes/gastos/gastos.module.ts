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
import { PaymentFormEffects } from 'redux/gastos/payment-form/payment-form.effects';
import { PaymentFormEffectsHelper } from 'redux/gastos/payment-form/payment-form-effects.helper';
import { TableConfigComponent } from './gastos-table/table-config/table-config.component';
import { EditFormEffects } from 'redux/gastos/edit-form/edit-form.effects';
import { EditFormEffectsHelper } from 'redux/gastos/edit-form/edit-form-effects.helper';
import { ProveedorFormModule } from '../proveedores/proveedor-form/proveedor-form.module';
import { GastosTableFacade } from './facade/gastos-table.facade';
import { TableRowFacade } from './facade/table-row.facade';
import { ButtonsFacade } from './facade/buttons.facade ';
import { TableConfigFacade } from './facade/table-config.facade';
import { GastosFormFacade } from './facade/gastos-form.facade';
import { FormInteractions } from './facade/gastos.form/form-interactions.facade';
import { CategoriasFinderService } from '../services/type-ahead/categorias-finder/categorias-finder.service';
import { DescripcionesFinderService } from '../services/type-ahead/descripciones-finder/descripciones-finder.service';
import { ServiciosFinderService } from '../services/type-ahead/servicios-finder/servicios-finder.service';
import { ProveedorFinderService } from '../services/type-ahead/proveedor-finder/proveedor-finder.service';
import { ConsorciosFinderService } from '../services/type-ahead/consorcios-finder/consorcios-finder.service';
import { GastosForm } from './forms/gastos.form';
import { PrincipalComponent } from './gastos-form/principal/principal.component';
import { GastosDescripcionesFormModule } from '../gastos-descripciones/gastos-descripciones-form/gastos-descripciones-form.module';

const Effects = [
  PageEffects,
  FilterFormEffects,
  CreateFormEffects,
  PaymentFormEffects,
  DeleteEffects,
  EditFormEffects,
];

const Helpers = [
  PaymentFormEffectsHelper,
  CreateFormEffectsHelper,
  DeleteEffectsHelper,
  EditFormEffectsHelper,
];

const Facades = [
  GastosTableFacade,
  TableRowFacade,
  ButtonsFacade,
  TableConfigFacade,
  GastosFormFacade,
  FormInteractions,
];

const Finders = [
  ConsorciosFinderService,
  ProveedorFinderService,
  ServiciosFinderService,
  DescripcionesFinderService,
  CategoriasFinderService,
];

const Services = [DrawerService, GastosForm];

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
    GastosDescripcionesFormModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('gastos', gastosReducers),
    EffectsModule.forFeature(Effects),
    ProveedorFormModule,
  ],
  declarations: [
    ...COMPONENTS,
    GastosComponent,
    TableRowComponent,
    GastosButtonsComponent,
    GastosTagsComponent,
    TableConfigComponent,
    PrincipalComponent,
  ],
  providers: [...Helpers, ...Services, ...Facades, ...Finders],
  entryComponents: [...COMPONENTS],
})
export class GastosModule {}
