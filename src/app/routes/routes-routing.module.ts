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
        loadChildren: () =>
          import('./proveedores/proveedores.module').then(
            mod => mod.ProveedoresModule,
          ),
      },
      {
        path: 'consorcios',
        loadChildren: () =>
          import('./consorcios/consorcios.module').then(
            mod => mod.ConsorciosModule,
          ),
      },
      {
        path: 'consorcios/perfil/:id',
        loadChildren: () =>
          import('./consorcios-profile/consorcios-profile.module').then(
            mod => mod.ConsorciosProfileModule,
          ),
      },
      {
        path: 'cheques',
        loadChildren: () =>
          import('./cheques/cheques.module').then(mod => mod.ChequesModule),
      },
      {
        path: 'chequeras',
        loadChildren: () =>
          import('./chequeras/chequeras.module').then(
            mod => mod.ChequerasModule,
          ),
      },
      {
        path: 'gastos',
        loadChildren: () =>
          import('./gastos/gastos.module').then(mod => mod.GastosModule),
      },
      {
        path: 'gastos-recurrentes',
        loadChildren: () =>
          import('./gastos-recurrentes/gastos-recurrentes.module').then(
            mod => mod.GastosRecurrentesModule,
          ),
      },
      {
        path: 'notas',
        loadChildren: () =>
          import('./notas/notas.module').then(mod => mod.NotasModule),
      },
      {
        path: 'cabeceras',
        loadChildren: () =>
          import('./cabeceras/cabeceras.module').then(
            mod => mod.CabecerasModule,
          ),
      },
      {
        path: 'cuenta-corriente',
        loadChildren: () =>
          import('./cuenta-corriente/cuenta-corriente.module').then(
            mod => mod.CuentaCorrienteModule,
          ),
      },
      {
        path: 'estado-financiero',
        loadChildren: () =>
          import('./estado-financiero/estado-financiero.module').then(
            mod => mod.EstadoFinancieroModule,
          ),
      },
      {
        path: 'periodos',
        loadChildren: () =>
          import('./periodos/periodos.module').then(mod => mod.PeriodosModule),
      },
      {
        path: 'empleados',
        loadChildren: () =>
          import('./empleados/empleados.module').then(
            mod => mod.EmpleadosModule,
          ),
      },
      {
        path: 'contactos',
        loadChildren: () =>
          import('./contactos/contactos.module').then(
            mod => mod.ContactosModule,
          ),
      },
      {
        path: 'servicios',
        loadChildren: () =>
          import('./servicios/servicios.module').then(
            mod => mod.ServiciosModule,
          ),
      },
      {
        path: 'bancos',
        loadChildren: () =>
          import('./bancos/bancos.module').then(mod => mod.BancosModule),
      },
      {
        path: 'cuentas-bancarias',
        loadChildren: () =>
          import('./cuentas-bancarias/cuentas-bancarias.module').then(
            mod => mod.CuentasBancariasModule,
          ),
      },
      {
        path: 'gastos-descripciones',
        loadChildren: () =>
          import('./gastos-descripciones/gastos-descripciones.module').then(
            mod => mod.GastosDescripcionesModule,
          ),
      },
      {
        path: 'caja-consorcio',
        loadChildren: () =>
          import('./caja-consorcio/caja-consorcio.module').then(
            mod => mod.CajaConsorcioModule,
          ),
      },
      {
        path: 'ordenes-pago',
        loadChildren: () =>
          import('./ordenes-pago/ordenes-pago.module').then(
            mod => mod.OrdenesPagoModule,
          ),
      },
      {
        path: 'cuenta-corriente-proveedor',
        loadChildren: () =>
          import(
            './cuenta-corriente-proveedor/cuenta-corriente-proveedor.module'
          ).then(mod => mod.CuentaCorrienteProveedorModule),
      },
      {
        path: 'cuenta-corriente-consorcio',
        loadChildren: () =>
          import(
            './cuenta-corriente-consorcio/cuenta-corriente-consorcio.module'
          ).then(mod => mod.CuentaCorrienteConsorcioModule),
      },
      {
        path: 'cuenta-corriente-uf',
        loadChildren: () =>
          import('./cuenta-corriente-uf/cuenta-corriente-uf.module').then(
            mod => mod.CuentaCorrienteUfModule,
          ),
      },
      {
        path: 'sueldos',
        loadChildren: () =>
          import('./sueldos/sueldos.module').then(mod => mod.SueldosModule),
      },
      {
        path: 'exception',
        loadChildren: () =>
          import('./exception/exception.module').then(
            mod => mod.ExceptionModule,
          ),
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
