import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProveedorFormComponent } from './proveedores/proveedor-form/proveedor-form.component';
import { ProveedorTableComponent } from './proveedores/proveedor-table/proveedor-table.component';
import { ProveedorTableFilterComponent } from './proveedores/proveedor-table-filter/proveedor-table-filter.component';
import { ConsorciosComponent } from './consorcios/consorcios.component';
import { ConsorcioFormComponent } from './consorcios/consorcio-form/consorcio-form.component';
import { ConsorcioTableComponent } from './consorcios/consorcio-table/consorcio-table.component';
import { ConsorcioTableFilterComponent } from './consorcios/consorcio-table-filter/consorcio-table-filter.component';
import { ChequesComponent } from './cheques/cheques.component';
import { ChequesTableComponent } from './cheques/cheques-table/cheques-table.component';
import { ChequesFormComponent } from './cheques/cheques-form/cheques-form.component';
import { ChequesTableFilterComponent } from './cheques/cheques-table-filter/cheques-table-filter.component';
import { ChequerasComponent } from './chequeras/chequeras.component';
import { ChequerasTableComponent } from './chequeras/chequeras-table/chequeras-table.component';
import { ChequerasFormComponent } from './chequeras/chequeras-form/chequeras-form.component';
import { ChequerasTableFilterComponent } from './chequeras/chequeras-table-filter/chequeras-table-filter.component';
import { ConfigFormComponent } from './cheques/cheques-form/config-form/config-form.component';
import { GastosComponent } from './gastos/gastos.component';
import { GastosTableComponent } from './gastos/gastos-table/gastos-table.component';
import { GastosTableFilterComponent } from './gastos/gastos-table-filter/gastos-table-filter.component';
import { GastosFormComponent } from './gastos/gastos-form/gastos-form.component';

//Periodos Routes
import { PeriodosComponent } from './periodos/periodos.component';
import { PeriodosTableComponent } from './periodos/periodos-table/periodos-table.component';
import { PeriodosTableFilterComponent } from './periodos/periodos-table-filter/periodos-table-filter.component';
import { PeriodosFormComponent } from './periodos/periodos-form/periodos-form.component';

const COMPONENTS = [
  DashboardComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // single pages
  CallbackComponent,
  UserLockComponent,
  ProveedoresComponent,
  ConsorciosComponent,
  ChequesComponent,
  ChequerasComponent,
  GastosComponent,
  
];
const COMPONENTS_NOROUNT = [
  ProveedorFormComponent,
  ProveedorTableFilterComponent,
  ProveedorTableComponent,
  ConsorcioFormComponent,
  ConsorcioTableComponent,
  ConsorcioTableFilterComponent,
  ChequesTableFilterComponent,
  ChequesTableComponent,
  ChequesFormComponent,
  ConfigFormComponent,
  ChequerasTableComponent,
  ChequerasFormComponent,
  ChequerasTableFilterComponent,
  GastosTableComponent,
  GastosFormComponent,
  GastosTableFilterComponent
];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT, PeriodosComponent, PeriodosTableComponent, PeriodosTableFilterComponent, PeriodosFormComponent],
  entryComponents: COMPONENTS_NOROUNT,
})
export class RoutesModule {}
