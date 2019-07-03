import { TestBed } from '@angular/core/testing';

import { MenuHandlerService } from './menu-handler.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { MenuService } from '@core/http/menu/menu.service';
import { of } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';

export class UncapsuledMenuHandlerService extends MenuHandlerService {
  getMenuAttr() {
    return this.menu;
  }

  getSubjectAttr() {
    return this.subject;
  }
}

export class FakeMenuService {
  getMenu() {
    return of([
      { title: 'fake_menu_form_service', url: 'fake_menu_form_service_url' },
    ]);
  }

  update() {
    return of([{ title: 'fake_menu_service', url: 'fake_menu_service_url' }]);
  }
}

describe('MenuHandlerService', () => {
  let service: UncapsuledMenuHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: MenuService, useClass: FakeMenuService }],
    });

    service = new UncapsuledMenuHandlerService(
      TestBed.get(LocalStorageService),
      TestBed.get(MenuService),
    );
    TestBed.get(MenuHandlerService);
    localStorage.removeItem('menu');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe llamar al menu service y refrescar el menu. (Fake Services)', () => {
    const menuService = TestBed.get(MenuService);
    const spy = spyOn(menuService, 'getMenu').and.returnValue(
      of([{ title: 'fake_menu', url: 'fake_url' }]),
    );

    service.refreshMenu();
    // el attr menu debe ser el que pase
    expect(service.getMenuAttr().length).toBe(1);
    expect(service.getMenuAttr()[0].title).toBe('fake_menu');
    expect(service.getMenuAttr()[0].url).toBe('fake_url');

    // el menu enviado por observable debe ser el que pase.
    service.getSubjectAttr().subscribe(menu => {
      expect(menu.length).toBe(1);
      expect(menu[0].title).toBe('fake_menu');
      expect(menu[0].url).toBe('fake_url');
    });

    // el menu en el local storage debe ser el que pase.
    const storedMenu = JSON.parse(localStorage.getItem('menu'));
    expect(storedMenu.length).toBe(1);
    expect(storedMenu[0].title).toBe('fake_menu');
    expect(storedMenu[0].url).toBe('fake_url');

    expect(spy).toHaveBeenCalled();
  });

  it('Debe actualizar el menu local y enviarlo al backend.', () => {
    const menuService = TestBed.get(MenuService);
    const spy = spyOn(menuService, 'update').and.returnValue(of());

    service.updateMenu([{ title: 'fake_menu', url: 'fake_url' }]);
    // el attr menu debe ser el que pase
    expect(service.getMenuAttr().length).toBe(1);
    expect(service.getMenuAttr()[0].title).toBe('fake_menu');
    expect(service.getMenuAttr()[0].url).toBe('fake_url');

    // el menu en el local storage debe ser el que pase.
    const storedMenu = JSON.parse(localStorage.getItem('menu'));
    expect(storedMenu.length).toBe(1);
    expect(storedMenu[0].title).toBe('fake_menu');
    expect(storedMenu[0].url).toBe('fake_url');

    expect(spy).toHaveBeenCalled();
  });

  it('Devolver el menu cuando aun no esta cargado. (Subject)', () => {
    expect(service.getLocalMenu()).toBeNull();

    const menuObservalbe = service.getMenu();
    expect(menuObservalbe).toBe(service.getSubjectAttr());

    menuObservalbe.subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0].title).toBe('fake_menu_form_service');
      expect(data[0].url).toBe('fake_menu_form_service_url');
    });
    service.refreshMenu();
  });

  it('Devolver el menu cuando aun no esta cargado.', () => {
    expect(service.getLocalMenu()).toBeNull();

    const menuObservalbe = service.getMenu();
    expect(menuObservalbe).toBe(service.getSubjectAttr());

    menuObservalbe.subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0].title).toBe('fake_menu_form_service');
      expect(data[0].url).toBe('fake_menu_form_service_url');
    });
    service.refreshMenu();
  });

  it('Debe devolver el menu guardado en memoria.', () => {
    service.refreshMenu();

    const localMenu = service.getMenu();

    localMenu.subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0].title).toBe('fake_menu_form_service');
      expect(data[0].url).toBe('fake_menu_form_service_url');
    });
  });
});
