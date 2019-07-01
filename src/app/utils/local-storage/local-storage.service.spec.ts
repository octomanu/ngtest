import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    service = TestBed.get(LocalStorageService);
    expect(service).toBeTruthy();
  });

  it('Debe setear un item en el local storage', () => {
    const item = { name: 'foo', value: 'bar' };
    service.setItem(item);
    expect(JSON.parse(localStorage.getItem('foo'))).toBe(item.value);
  });

  it('Debe obtener un item del local storage', () => {
    localStorage.setItem('foo', JSON.stringify('bar'));
    expect(service.getItem({ name: 'foo' })).toBe('bar');
  });

  it('Debe eliminar un item del local storage', () => {
    localStorage.setItem('foo', JSON.stringify('bar'));
    service.deleteItem({ name: 'foo' });
    expect(localStorage.getItem('foo')).toBeNull();
  });

  it('Debe verificar si hay un item en el local storage', () => {
    localStorage.setItem('foo', JSON.stringify('bar'));
    expect(service.hasItem({ name: 'foo' })).toBeTruthy();
    expect(service.hasItem({ name: 'bar' })).toBeFalsy();
  });
});
