import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { GastosRecurrentesService } from '@core/http/gastos-recurrentes/gastos-recurrentes.service';
import {
  NzDropdownService,
  NzMessageService,
  NzDrawerService,
} from 'ng-zorro-antd';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { GastosRecurrentesFormComponent } from '../gastos-recurrentes-form/gastos-recurrentes-form.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-gastos-recurrentes-table',
  templateUrl: './gastos-recurrentes-table.component.html',
  styles: [],
})
export class GastosRecurrentesTableComponent extends TableLambe
  implements OnInit, OnDestroy {
  protected submitForm = new Subject<{ submit: boolean }>();
  constructor(
    private msg: NzMessageService,
    private translate: TranslateService,
    private drawerService: NzDrawerService,
    gastosRecurrentesService: GastosRecurrentesService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(gastosRecurrentesService, nzDropdownService, breakpointObserver);
  }

  _openForm(id?: number) {
    const valueChangeSubscription = this.submitForm
      .asObservable()
      .subscribe(value => {
        this.searchData();
      });

    this.translate.get('lambe.cheques').subscribe((res: string) => {
      this.drawerRef = this.drawerService.create<
        GastosRecurrentesFormComponent,
        { id: number; valueChange: Subject<{ submit: boolean }> }
      >({
        nzTitle: res,
        nzWidth: this.initialDrawerWidth,
        nzContent: GastosRecurrentesFormComponent,
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

  ngOnInit(): void {
    this.searchData();
    this.subscribeBreakPoint();
  }

  ngOnDestroy(): void {
    this.unsubscribeBreakPoint();
  }
}
