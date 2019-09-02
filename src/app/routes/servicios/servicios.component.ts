import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { GlobalState } from 'redux/global/globa.reducer';
import { Subscription, Observable } from 'rxjs';
import {
  selectGlobal,
  selectHelp,
  selectKeepHelp,
  smallViewport,
} from 'redux/global/global.selectors';
import { TranslateService } from '@ngx-translate/core';
import { ServiciosFormComponent } from './servicios-form/servicios-form.component';
import { NzDrawerService } from 'ng-zorro-antd';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styles: [],
})
export class ServiciosComponent implements OnInit, OnDestroy {
  help: Observable<boolean>;
  keepHelp: Observable<boolean>;
  smallViewport: boolean;
  subscription: Subscription;

  constructor(
    protected store: Store<AppState>,
    public drawerService: NzDrawerService,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    this.help = this.store.select(selectHelp);
    this.keepHelp = this.store.select(selectKeepHelp);

    this.subscription = this.store
      .select(smallViewport)
      .subscribe((small: boolean) => {
        this.smallViewport = small;
      });
  }

  openForm(id?: number) {
    this.translate.get('global.servicios').subscribe((res: string) => {
      this.drawerService.create({
        nzTitle: res,
        nzWidth: this.smallViewport ? '100%' : '75%',
        nzContent: ServiciosFormComponent,
        nzPlacement: 'right',
        nzContentParams: { id },
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
