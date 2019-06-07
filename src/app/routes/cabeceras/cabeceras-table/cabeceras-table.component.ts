import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NzMessageService,
  NzDrawerService,
  NzDropdownService,
} from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CabecerasService } from '@core/http/cabeceras/cabeceras.service';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { Subject } from 'rxjs';
import { CabecerasFormComponent } from '../cabeceras-form/cabeceras-form.component';

@Component({
  selector: 'app-cabeceras-table',
  templateUrl: './cabeceras-table.component.html',
  styles: [],
})
export class CabecerasTableComponent extends TableLambe
  implements OnInit, OnDestroy {
  protected submitForm = new Subject<{ submit: boolean }>();

  constructor(
    private msg: NzMessageService,
    private translate: TranslateService,
    private drawerService: NzDrawerService,
    cabecerasService: CabecerasService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(cabecerasService, nzDropdownService, breakpointObserver);
  }

  ngOnInit(): void {
    this.searchData();
    this.subscribeBreakPoint();
  }

  ngOnDestroy(): void {
    this.unsubscribeBreakPoint();
  }

  _openForm(id?: number) {
    const valueChangeSubscription = this.submitForm
      .asObservable()
      .subscribe(value => {
        this.searchData();
      });

    this.translate.get('lambe.cabeceras').subscribe((res: string) => {
      this.drawerRef = this.drawerService.create<
        CabecerasFormComponent,
        { id: number; valueChange: Subject<{ submit: boolean }> }
      >({
        nzTitle: res,
        nzWidth: this.initialDrawerWidth,
        nzContent: CabecerasFormComponent,
        nzContentParams: { id, valueChange: this.submitForm },
      });

      this.drawerRef.afterClose.subscribe(
        (data: { submit: boolean } | undefined) => {
          if (!data) return;
          if (data.submit) this.searchData();
          valueChangeSubscription.unsubscribe();
        },
      );

      this.drawerRef.afterOpen.subscribe(data => {
        this.closeMenu();
      });
    });
  }
}
