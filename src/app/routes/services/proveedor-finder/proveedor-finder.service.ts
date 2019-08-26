import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TypeAheadOption } from 'app/interfaces/local/type-ahead-option.interface';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';

@Injectable()
export class ProveedorFinderService {
  timeout = null;
  private isLoading$ = new BehaviorSubject<boolean>(false);
  private proveedores$ = new BehaviorSubject<TypeAheadOption[]>([]);
  public isLoading = this.isLoading$.asObservable();
  public proveedores = this.proveedores$.asObservable();

  constructor(protected proveedoresService: ProveedoresService) {
    this.searchProveedores('', false);
  }

  searchProveedores(display: string, delay = true) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
      this.timeout = null;
    }

    if (delay) {
      this.timeout = window.setTimeout(() => {
        this.isLoading$.next(true);
        this.searchProveedoresList(display);
      }, 400);
    } else {
      this.isLoading$.next(true);
      this.searchProveedoresList(display);
    }
  }

  protected searchProveedoresList(display: string) {
    this.proveedoresService
      .searchProveedor(display)
      .subscribe((data: TypeAheadOption[]) => {
        this.isLoading$.next(false);
        this.proveedores$.next(data);
      });
  }
}
