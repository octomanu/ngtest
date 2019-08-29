import { Injectable } from '@angular/core';
import { UnidadesFuncionalesService } from '@core/http/unidades-funcionales/unidades-funcionales.service';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { BehaviorSubject } from 'rxjs';
import { TypeAheadOption } from 'app/interfaces/local/type-ahead-option.interface';

@Injectable()
export class UfFinderService {
  timeout = null;
  private isLoading$ = new BehaviorSubject<boolean>(false);
  private consorcios$ = new BehaviorSubject<TypeAheadOption[]>([]);
  private ufs$ = new BehaviorSubject<TypeAheadOption[]>([]);
  public isLoading = this.isLoading$.asObservable();
  public consorcios = this.consorcios$.asObservable();
  public ufs = this.ufs$.asObservable();

  constructor(
    public consorciosService: ConsorciosService,
    public ufsService: UnidadesFuncionalesService,
  ) {
    this.searchConsorcios('', false);
  }

  searchConsorcios(display: string, delay = true) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
      this.timeout = null;
    }

    if (delay) {
      this.timeout = window.setTimeout(() => {
        this.isLoading$.next(true);
        this.searchConsorcioList(display);
      }, 400);
    } else {
      this.isLoading$.next(true);
      this.searchConsorcioList(display);
    }
  }

  searchUfs(display: string, delay = true) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
      this.timeout = null;
    }

    if (delay) {
      this.timeout = window.setTimeout(() => {
        this.isLoading$.next(true);
        this.searchUfsList(display);
      }, 400);
    } else {
      this.isLoading$.next(true);
      this.searchUfsList(display);
    }
  }

  protected searchConsorcioList(display: string) {
    this.consorciosService
      .searchByDisplay(display)
      .subscribe((data: TypeAheadOption[]) => {
        this.isLoading$.next(false);
        this.consorcios$.next(data);
      });
  }

  protected searchUfsList(display: string) {
    this.ufsService
      .searchByDisplay(display)
      .subscribe((data: TypeAheadOption[]) => {
        this.isLoading$.next(false);
        this.ufs$.next(data);
      });
  }
}
