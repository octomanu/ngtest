import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TypeAheadOption } from 'app/interfaces/local/type-ahead-option.interface';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { share } from 'rxjs/operators';

@Injectable()
export class ConsorciosFinderService {
  timeout = null;
  private isLoading$ = new BehaviorSubject<boolean>(true);
  private consorcios$ = new BehaviorSubject<TypeAheadOption[]>([]);
  public isLoading = this.isLoading$.asObservable().pipe(share());
  public consorcios = this.consorcios$.asObservable();

  constructor(public consorciosService: ConsorciosService) {
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

  protected searchConsorcioList(display: string) {
    this.consorciosService
      .searchByDisplay(display)
      .subscribe((data: TypeAheadOption[]) => {
        this.isLoading$.next(false);
        this.consorcios$.next(data);
      });
  }
}
