import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { NzResultModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserLoginComponent } from './passport/login/login.component';
import { ProfileComponent } from './consorcios-profile/profile/profile.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { CallbackComponent } from './callback/callback.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  imports: [
    SharedModule,
    RouteRoutingModule,
    NgxDnDModule,
    NzResultModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    DashboardComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserRegisterResultComponent,
    CallbackComponent,
    UserLockComponent,
    ProfileComponent,
  ],
})
export class RoutesModule {}
