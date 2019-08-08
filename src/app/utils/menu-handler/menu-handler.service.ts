import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { MenuService } from '@core/http/menu/menu.service';
import { Subject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MenuHandlerService {
  protected subject = new Subject<any>();
  protected menu: any[];

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
    this.menuService.getMenu().subscribe((menu: any) => {
      this.menu = menu.menu;
      this.localStorage.setItem({ name: 'menu', value: menu.menu });
      this.subject.next(menu.menu);
    });
  }

  deleteMenu() {
    return this.menuService.delete().pipe(
      map((menu: any) => {
        this.menu = menu.menu;
        this.localStorage.setItem({ name: 'menu', value: menu.menu });
        this.subject.next(menu.menu);
        return menu.menu;
      }),
    );
  }

  // Actualzia el emnu aca y en el backend
  updateMenu(menu: any[]) {
    this.menu = menu;
    this.localStorage.setItem({ name: 'menu', value: menu });
    return this.menuService.update(menu);
  }
}
