import {
  Component,
  ChangeDetectionStrategy,
  TemplateRef,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { SettingsService } from '@delon/theme';
import { NzDropdownContextComponent, NzDropdownService } from 'ng-zorro-antd';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MenuHandlerService } from 'app/utils/menu-handler/menu-handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy {
  protected dropdown: NzDropdownContextComponent;
  protected menuSubscription: Subscription;
  protected settingsSubscription: Subscription;
  protected form: FormGroup;
  protected showAll = false;
  protected isCollapsed: boolean;
  protected orderableList = [];
  constructor(
    protected settings: SettingsService,
    protected nzDropdownService: NzDropdownService,
    protected cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    protected menuHandler: MenuHandlerService,
  ) {}

  ngOnInit() {
    this.isCollapsed = this.settings.layout.collapsed;

    this.settings.notify.subscribe((event: any) => {
      if (event.type === 'layout') {
        this.isCollapsed = event.value;
        this.cdr.detectChanges();
      }
    });

    this.menuSubscription = this.menuHandler.getMenu().subscribe(menu => {
      this.orderableList = menu;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.menuSubscription.unsubscribe();
    this.settingsSubscription.unsubscribe();
  }

  initFormn() {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      route: [null, [Validators.required]],
      fav: [null, []],
    });
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    this.initFormn();
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  contextMenuRow(
    $event: MouseEvent,
    template: TemplateRef<void>,
    item: any,
  ): void {
    this.initFormn();
    console.log(item);
    this.form.get('title').setValue(item.title);
    this.form.get('route').setValue(item.route);
    this.form.get('fav').setValue(item.fav);
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  closeMenu() {
    this.dropdown.close();
    this.cdr.detectChanges();
  }

  crearItem(favorito: boolean) {
    if (this.form.invalid) {
      return;
    }

    this.orderableList.push({
      custom: true,
      title: this.form.value.title,
      route: this.form.value.route,
      icon: 'link',
      fav: favorito,
    });
    this.cdr.detectChanges();
    this.menuHandler.updateMenu(this.orderableList);
    this.dropdown.close();
  }

  editarItem(item: any) {
    if (this.form.invalid) {
      return;
    }
    item.title = this.form.value.title;
    item.route = this.form.value.route;
    item.fav = this.form.value.fav;
    this.cdr.detectChanges();
    this.menuHandler.updateMenu(this.orderableList);
    this.dropdown.close();
  }

  eliminarItem(item: any) {
    this.menuHandler.updateMenu(this.orderableList);
    const index: number = this.orderableList.indexOf(item);
    if (index !== -1) {
      this.orderableList.splice(index, 1);
    }
    this.cdr.detectChanges();
    this.menuHandler.updateMenu(this.orderableList);
    this.dropdown.close();
  }
}
