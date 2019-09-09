import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { CuentasBancariasComponent } from './cuentas-bancarias.component';
import { CuentasBancariasEffects } from 'redux/cuentas-bancarias/cuentas-bancarias.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CuentasBancariasReducer } from 'redux/cuentas-bancarias/cuentas-bancarias.reducer';

const Effects = [CuentasBancariasEffects];

const Helpers = [];

export const routes: Routes = [
  {
    path: '',
    component: CuentasBancariasComponent,
    data: { title: 'Cuentas bancarias' },
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('cuentasBancarias', CuentasBancariasReducer),
    EffectsModule.forFeature(Effects),
  ],
  declarations: [...COMPONENTS, CuentasBancariasComponent],
  entryComponents: COMPONENTS,
})
export class CuentasBancariasModule {}
