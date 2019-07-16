import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { MenuHandlerService } from 'app/utils/menu-handler/menu-handler.service';

@Component({
  selector: 'header-icon',
  templateUrl: './header-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderIconComponent {
  loading = true;
  menuSubscription;
  menu = [];

  constructor(
    private cdr: ChangeDetectorRef,
    protected menuHandler: MenuHandlerService,
  ) {
    this.menuSubscription = this.menuHandler.getMenu().subscribe(menu => {
      this.menu = menu;
      this.cdr.detectChanges();
    });
  }

  change() {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    }, 500);
  }
}
