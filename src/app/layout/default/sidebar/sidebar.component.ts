import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { SettingsService } from '@delon/theme';
import { NzDrawerService } from 'ng-zorro-antd';
import { MenuHandlerService } from 'app/utils/menu-handler/menu-handler.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { GlobalState } from 'redux/global/globa.reducer';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { CrearMenuComponent } from '../crear-menu/crear-menu.component';
import { MenuState } from 'redux/menu/menu.reducer';
import { EditarMenuComponent } from '../editar-menu/editar-menu.component';
import { DeleteMenuAction } from 'redux/menu/menu.actions';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy {
  help: boolean;
  keepHelp: boolean;
  icons = [];
  subscriptions: Subscription[] = [];
  isCollapsed: boolean;
  orderableList = [];

  panel = {
    active: false,
    disabled: false,
    customStyle: {
      background: '#ffffff',
      'border-radius': '4px',
      'margin-bottom': '24px',
      border: '0px',
    },
  };

  constructor(
    public http: HttpClient,
    public store: Store<AppState>,
    public settings: SettingsService,
    public cdr: ChangeDetectorRef,
    public menuHandler: MenuHandlerService,
    public translate: TranslateService,
    public drawerService: NzDrawerService,
  ) {}

  openCrearMenu() {
    this.translate.get('global.nuevo_menu').subscribe((res: string) => {
      this.drawerService.create({
        nzTitle: res,
        nzWidth: '50%',
        nzContent: CrearMenuComponent,
        nzPlacement: 'left',
      });
    });
  }

  openEditarMenu(item: any, index: number) {
    this.translate.get('global.nuevo_menu').subscribe((res: string) => {
      this.drawerService.create({
        nzTitle: res,
        nzWidth: '50%',
        nzContent: EditarMenuComponent,
        nzPlacement: 'left',
        nzContentParams: { item: { ...item }, index },
      });
    });
    return false;
  }

  ngOnInit() {
    const menuSub = this.store
      .select('menuState')
      .subscribe((state: MenuState) => {
        this.orderableList = state.menu;
        this.cdr.detectChanges();
      });

    const clogalSub = this.store
      .select('globalState')
      .subscribe((state: GlobalState) => {
        this.help = state.help;
        this.keepHelp = state.keepHelp;
        this.cdr.detectChanges();
      });

    this.isCollapsed = this.settings.layout.collapsed;

    const settingsSub = this.settings.notify.subscribe((event: any) => {
      if (event.type === 'layout') {
        this.isCollapsed = event.value;
        this.cdr.detectChanges();
      }
    });

    this.http.get('assets/tmp/icons.json').subscribe(data => {
      this.icons = data['icons'];
    });

    this.subscriptions.push(menuSub, clogalSub, settingsSub);
  }

  toggleCollapsed(): void {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  deleteMenu() {
    this.store.dispatch(new DeleteMenuAction());
  }

  ngOnDestroy(): void {
    this.subscriptions.map((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
