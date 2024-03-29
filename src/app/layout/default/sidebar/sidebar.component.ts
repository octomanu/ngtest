import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
} from '@angular/core';
import { SettingsService } from '@delon/theme';
import { NzDrawerService } from 'ng-zorro-antd';
import { MenuHandlerService } from 'app/utils/menu-handler/menu-handler.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { GlobalState } from 'redux/global/globa.reducer';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { CrearMenuComponent } from '../crear-menu/crear-menu.component';
import { MenuState } from 'redux/menu/menu.reducer';
import { EditarMenuComponent } from '../editar-menu/editar-menu.component';
import { DeleteMenuAction, MenuRequest } from 'redux/menu/menu.actions';
import { ModalHelpComponent } from '@shared/components/modal-help/modal-help.component';
import { selectHelpUrl } from 'redux/global/global.selectors';
import { map, share } from 'rxjs/operators';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { read: ViewContainerRef, static: false })
  modalContainer: ViewContainerRef;
  modalRef: ComponentRef<ModalHelpComponent>;
  help: boolean;
  keepHelp: boolean;
  icons = [];
  subscriptions: Subscription[] = [];
  isCollapsed: boolean;
  orderableList: Observable<any[]>;
  menu: any[];

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
    private resolver: ComponentFactoryResolver,
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
    this.store.dispatch(new MenuRequest());
    this.store
      .select('menuState')
      .pipe(
        map((state: MenuState) => {
          this.cdr.detectChanges();
          this.menu = state.menu;
          return this.menu;
        }),
        share(),
      )
      .subscribe();

    const clogalSub = this.store
      .select('globalState')
      .subscribe((state: GlobalState) => {
        this.help = state.help;
        this.keepHelp = state.keepHelp;
        this.cdr.detectChanges();
      });

    this.store.select(selectHelpUrl).subscribe((url: string) => {
      if (url) {
        const factory = this.resolver.resolveComponentFactory(
          ModalHelpComponent,
        );
        this.modalRef = this.modalContainer.createComponent(factory);
        this.cdr.detectChanges();
        this.modalRef.instance.show(url);
      } else {
        if (this.modalRef) {
          this.modalRef.destroy();
        }
      }
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

    this.subscriptions.push(clogalSub, settingsSub);
  }

  toggleCollapsed(): void {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  deleteMenu() {
    this.store.dispatch(new DeleteMenuAction());
  }

  onDrop(event: any) {
    console.log(this.menu, event);
  }

  ngOnDestroy(): void {
    this.subscriptions.map((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
