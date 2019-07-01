import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { MenuService } from '@core/http/menu/menu.service';
import { Subject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuHandlerService {
  private subject = new Subject<any>();
  private menu: any[];

  constructor(
    protected localStorage: LocalStorageService,
    protected menuService: MenuService,
  ) {}

  public getMenu(): Observable<any> {
    const localMenu = this.getLocalMenu();
    if (localMenu) {
      return of(localMenu);
    }
    this.refreshMenu();
    return this.subject;
  }

  getLocalMenu() {
    if (this.menu) {
      return this.menu;
    }
    return this.localStorage.getItem({ name: 'menu' });
  }

  refreshMenu() {
    this.menuService.getMenu().subscribe((menu: any[]) => {
      this.menu = menu;
      this.localStorage.setItem({ name: 'menu', value: menu });
      this.subject.next(menu);
    });
  }

  // Actualzia el emnu aca y en el backend
  updateMenu(menu: any[]) {
    this.menu = menu;
    this.localStorage.setItem({ name: 'menu', value: menu });
    this.menuService.update(menu).subscribe(data => {});
  }
}
