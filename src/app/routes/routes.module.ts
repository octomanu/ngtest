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
import { ConsorciosProfileComponent } from './consorcios-profile/consorcios-profile.component';
import { ProfileComponent } from './consorcios-profile/profile/profile.component';
import { TabUfComponent } from './consorcios-profile/profile/tab-uf/tab-uf.component';
import { TabPorcentualesComponent } from './consorcios-profile/profile/tab-porcentuales/tab-porcentuales.component';
import { ProcentualesFormComponent } from './consorcios-profile/profile/tab-porcentuales/procentuales-form/procentuales-form.component';
import { GastosRecurrentesComponent } from './gastos-recurrentes/gastos-recurrentes.component';
import { GastosRecurrentesTableComponent } from './gastos-recurrentes/gastos-recurrentes-table/gastos-recurrentes-table.component';
import { GastosRecurrentesFormComponent } from './gastos-recurrentes/gastos-recurrentes-form/gastos-recurrentes-form.component';
import { CabecerasComponent } from './cabeceras/cabeceras.component';
import { CabecerasTableComponent } from './cabeceras/cabeceras-table/cabeceras-table.component';
import { CabecerasFormComponent } from './cabeceras/cabeceras-form/cabeceras-form.component';
import { NotasComponent } from './notas/notas.component';
import { NotasTableComponent } from './notas/notas-table/notas-table.component';
import { NotasFormComponent } from './notas/notas-form/notas-form.component';
import { CuentaCorrienteComponent } from './cuenta-corriente/cuenta-corriente.component';
import { CuentaCorrienteTableComponent } from './cuenta-corriente/cuenta-corriente-table/cuenta-corriente-table.component';
import { CuentaCorrienteFormComponent } from './cuenta-corriente/cuenta-corriente-form/cuenta-corriente-form.component';
import { EstadoFinancieroProveedoresComponent } from './estado-financiero-proveedores/estado-financiero-proveedores.component';
import { EfpTableComponent } from './estado-financiero-proveedores/efp-table/efp-table.component';

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
  GastosRecurrentesComponent,
  ProfileComponent,
  CabecerasComponent,
  ConsorciosProfileComponent,
  NotasComponent,
  CuentaCorrienteComponent,
  EstadoFinancieroProveedoresComponent,
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
  GastosTableFilterComponent,
  TabUfComponent,
  TabPorcentualesComponent,
  ProcentualesFormComponent,
  GastosRecurrentesFormComponent,
  GastosRecurrentesTableComponent,
  CabecerasTableComponent,
  CabecerasFormComponent,
  NotasTableComponent,
  NotasFormComponent,
  CuentaCorrienteFormComponent,
  CuentaCorrienteTableComponent,
  EfpTableComponent,
];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class RoutesModule {}
