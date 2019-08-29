import {
  Component,
  Inject,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { AuthState } from 'redux/auth/auth.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'header-user',
  template: `
    <nz-dropdown nzPlacement="bottomRight">
      <div
        class="alain-default__nav-item d-flex align-items-center px-sm"
        nz-dropdown
      >
        <nz-avatar
          [nzSrc]="settings.user.avatar"
          nzSize="small"
          class="mr-sm"
        ></nz-avatar>
        {{ settings.user.name }}
      </div>
      <div nz-menu class="width-sm">
        <div nz-menu-item routerLink="/pro/account/center">
          <i nz-icon nzType="user" class="mr-sm"></i>
          {{ 'menu.account.center' | translate }}
        </div>
        <div nz-menu-item routerLink="/pro/account/settings">
          <i nz-icon nzType="setting" class="mr-sm"></i>
          {{ 'menu.account.settings' | translate }}
        </div>
        <div nz-menu-item routerLink="/exception/trigger">
          <i nz-icon nzType="close-circle" class="mr-sm"></i>
          {{ 'menu.account.trigger' | translate }}
        </div>
        <li nz-menu-divider></li>
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          {{ 'menu.account.logout' | translate }}
        </div>
      </div>
    </nz-dropdown>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    public settings: SettingsService,
    public store: Store<AppState>,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('authState')
      .subscribe((state: AuthState) => {});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url);
  }
}
