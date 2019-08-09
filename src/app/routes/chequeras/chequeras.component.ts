import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { NzDrawerService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { selectGlobal } from 'redux/global/global.selectors';
import { GlobalState } from 'redux/global/globa.reducer';
import { ChequerasFormComponent } from './chequeras-form/chequeras-form.component';

@Component({
  selector: 'app-chequeras',
  templateUrl: './chequeras.component.html',
  styles: [],
})
export class ChequerasComponent implements OnInit, OnDestroy {
  help: boolean;
  keepHelp: boolean;
  smallViewport: boolean;
  subscription: Subscription;
  constructor(
    protected store: Store<AppState>,
    public drawerService: NzDrawerService,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select(selectGlobal)
      .subscribe((state: GlobalState) => {
        this.help = state.help;
        this.keepHelp = state.keepHelp;
        this.smallViewport = state.smallViewport;
      });
  }

  openForm(id?: number) {
    this.translate.get('global.chequeras').subscribe((res: string) => {
      this.drawerService.create({
        nzTitle: res,
        nzWidth: this.smallViewport ? '100%' : '75%',
        nzContent: ChequerasFormComponent,
        nzPlacement: 'right',
        nzContentParams: { id },
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
