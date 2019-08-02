import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import {
  ChangeKeepHelpAction,
  ChangeHelpAction,
} from 'redux/global/global.actions';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  searchToggleStatus: boolean;
  helpActive = false;

  constructor(
    public settings: SettingsService,
    public store: Store<AppState>,
  ) {}

  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }

  changeShowHelp(show: boolean) {
    this.store.dispatch(new ChangeKeepHelpAction(show));
  }

  changeHelp() {
    this.helpActive = !this.helpActive;
    this.store.dispatch(new ChangeHelpAction(this.helpActive));
  }
}
