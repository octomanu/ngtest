import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
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
import { ConsorciosComponent } from './consorcios/consorcios.component';
import { ChequesComponent } from './cheques/cheques.component';
import { ChequerasComponent } from './chequeras/chequeras.component';
import { GastosComponent } from './gastos/gastos.component';
import { ConsorciosProfileComponent } from './consorcios-profile/consorcios-profile.component';
import { GastosRecurrentesComponent } from './gastos-recurrentes/gastos-recurrentes.component';
import { CabecerasComponent } from './cabeceras/cabeceras.component';
import { NotasComponent } from './notas/notas.component';
import { CuentaCorrienteComponent } from './cuenta-corriente/cuenta-corriente.component';
import { EstadoFinancieroComponent } from './estado-financiero/estado-financiero.component';
import { PeriodosComponent } from './periodos/periodos.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ContactosComponent } from './contactos/contactos.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { BancosComponent } from './bancos/bancos.component';
import { CuentasBancariasComponent } from './cuentas-bancarias/cuentas-bancarias.component';
import { GastosDescripcionesComponent } from './gastos-descripciones/gastos-descripciones.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [SimpleGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: '仪表盘' },
      },
      {
        path: 'proveedores',
        component: ProveedoresComponent,
        data: { title: 'Proveedores' },
      },
      {
        path: 'consorcios',
        component: ConsorciosComponent,
        data: { title: 'Consorcios' },
      },
      {
        path: 'consorcios/perfil/:id',
        component: ConsorciosProfileComponent,
        data: { title: 'Perfil' },
      },
      {
        path: 'cheques',
        component: ChequesComponent,
        data: { title: 'Cheques' },
      },
      {
        path: 'chequeras',
        component: ChequerasComponent,
        data: { title: 'Chequeras' },
      },
      { path: 'gastos', component: GastosComponent, data: { title: 'Gastos' } },
      {
        path: 'gastos-recurrentes',
        component: GastosRecurrentesComponent,
        data: { title: 'Gastos Recurrente' },
      },
      { path: 'notas', component: NotasComponent, data: { title: 'Notas' } },
      {
        path: 'cabeceras',
        component: CabecerasComponent,
        data: { title: 'Cabeceras' },
      },
      {
        path: 'cuenta-corriente',
        component: CuentaCorrienteComponent,
        data: { title: 'Cuenta Corriente' },
      },
      {
        path: 'estado-financiero',
        component: EstadoFinancieroComponent,
        data: { title: 'Estado Financiero' },
      },
      {
        path: 'periodos',
        component: PeriodosComponent,
        data: { title: 'Periodos' },
      },
      {
        path: 'empleados',
        component: EmpleadosComponent,
        data: { title: 'Empleados' },
      },
      {
        path: 'contactos',
        component: ContactosComponent,
        data: { title: 'Contactos' },
      },
      {
        path: 'servicios',
        component: ServiciosComponent,
        data: { title: 'Servicios' },
      },
      {
        path: 'bancos',
        component: BancosComponent,
        data: { title: 'Bancos' },
      },
      {
        path: 'cuentas-bancarias',
        component: CuentasBancariasComponent,
        data: { title: 'Cuentas Bancarias' },
      },
      {
        path: 'gastos-descripciones',
        component: GastosDescripcionesComponent,
        data: { title: 'Descripciones de Gastos' },
      },
      {
        path: 'exception',
        loadChildren: './exception/exception.module#ExceptionModule',
      },
      // 业务子模块
      // { path: 'widgets', loadChildren: './widgets/widgets.module#WidgetsModule' }
    ],
  },
  // 全屏布局
  {
    path: 'fullscreen',
    component: LayoutFullScreenComponent,
    children: [],
  },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录' } },
      {
        path: 'register',
        component: UserRegisterComponent,
        data: { title: '注册' },
      },
      {
        path: 'register-result',
        component: UserRegisterResultComponent,
        data: { title: '注册结果' },
      },
      { path: 'lock', component: UserLockComponent, data: { title: '锁屏' } },
    ],
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule {}
