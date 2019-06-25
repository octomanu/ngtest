import { Injectable } from '@angular/core';
import { LocalStorageItem } from 'app/interfaces/local/local-storage-item.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(item: LocalStorageItem) {
    localStorage.setItem(item.name, JSON.stringify(item.value));
  }

  getItem(item: LocalStorageItem) {
    return JSON.parse(localStorage.getItem(item.name));
  }

  deleteItem(item: LocalStorageItem) {
    localStorage.removeItem(item.name);
  }

  hasItem(item: LocalStorageItem) {
    const itemStored = localStorage.getItem(item.name);

    return itemStored ? true : false;
  }
}
