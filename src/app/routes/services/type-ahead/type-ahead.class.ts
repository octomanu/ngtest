import { BehaviorSubject } from 'rxjs';
import { TypeAheadOption } from 'app/interfaces/local/type-ahead-option.interface';
import { TypeAheadService } from 'app/interfaces/local/type-ahead-service.interface';

export class TypeAhead {
  protected timeout = null;
  protected isLoading$ = new BehaviorSubject<boolean>(false);
  protected optionsSubject$ = new BehaviorSubject<TypeAheadOption[]>([]);
  public isLoading = this.isLoading$.asObservable();
  public options = this.optionsSubject$.asObservable();

  constructor(protected dataService: TypeAheadService) {}

  search(display: string, delay = true) {
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
