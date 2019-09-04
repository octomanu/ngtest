import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { NzDrawerService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import {
  selectHelp,
  selectKeepHelp,
  smallViewport,
} from 'redux/global/global.selectors';
import { CabecerasFormComponent } from './cabeceras-form/cabeceras-form.component';

@Component({
  selector: 'app-cabeceras',
  templateUrl: './cabeceras.component.html',
  styles: [],
})
export class CabecerasComponent implements OnInit, OnDestroy {
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
        nzContent: CabecerasFormComponent,
        nzPlacement: 'right',
        nzContentParams: { id },
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
