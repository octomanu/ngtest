import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { NzDrawerService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { selectGlobal } from 'redux/global/global.selectors';
import { GlobalState } from 'redux/global/globa.reducer';
import { OnInit, OnDestroy } from '@angular/core';

export class WrapComponent implements OnInit, OnDestroy {
  drawerTitle = '';
  drawerContent: any;
  help: boolean;
  keepHelp: boolean;
  smallViewport: boolean;
  globalSubscription: Subscription;

  constructor(
    protected store: Store<AppState>,
    public drawerService: NzDrawerService,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    this.globalSubscription = this.store
      .select(selectGlobal)
      .subscribe((state: GlobalState) => {
        this.help = state.help;
        this.keepHelp = state.keepHelp;
        this.smallViewport = state.smallViewport;
      });
  }

  openForm(id?: number) {
    this.translate.get(this.drawerTitle).subscribe((res: string) => {
      this.drawerService.create({
        nzTitle: res,
        nzWidth: this.smallViewport ? '100%' : '75%',
        nzContent: this.drawerContent,
        nzPlacement: 'right',
        nzContentParams: { id },
      });
    });
  }

  ngOnDestroy() {
    this.globalSubscription.unsubscribe();
  }
}
