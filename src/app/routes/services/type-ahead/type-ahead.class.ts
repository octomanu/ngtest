import { BehaviorSubject } from 'rxjs';
import { TypeAheadOption } from 'app/interfaces/local/type-ahead-option.interface';
import { TypeAheadService } from 'app/interfaces/local/type-ahead-service.interface';
import { share } from 'rxjs/operators';

export class TypeAhead {
  protected timeout = null;
  protected isLoading$ = new BehaviorSubject<boolean>(true);
  protected optionsSubject$ = new BehaviorSubject<TypeAheadOption[]>([]);
  public isLoading = this.isLoading$.asObservable().pipe(share());
  public options = this.optionsSubject$.asObservable();

  constructor(protected dataService: TypeAheadService) {}

  get value() {
    return this.optionsSubject$.value;
  }

  search(display: string, delay = true) {
    if (typeof display === 'undefined') return;
    if (this.timeout) {
      window.clearTimeout(this.timeout);
      this.timeout = null;
    }

    if (delay) {
      this.timeout = window.setTimeout(() => {
        this.isLoading$.next(true);
        this.searchList(display);
      }, 400);
    } else {
      this.isLoading$.next(true);
      this.searchList(display);
    }
  }

  protected searchList(display: string) {
    this.dataService
      .searchByDisplay(display)
      .subscribe((options: TypeAheadOption[]) => {
        this.isLoading$.next(false);
        this.optionsSubject$.next(options);
      });
  }
}
