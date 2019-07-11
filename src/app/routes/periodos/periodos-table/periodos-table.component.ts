import { Component } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { TranslateService } from '@ngx-translate/core';
import {
  NzDrawerService,
  NzDropdownService,
  NzMessageService,
} from 'ng-zorro-antd';
import { PeriodosService } from '@core/http/periodos/periodos.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { PeriodosFormComponent } from '../periodos-form/periodos-form.component';

@Component({
  selector: 'app-periodos-table',
  templateUrl: './periodos-table.component.html',
  styles: [],
})
export class PeriodosTableComponent extends TableLambe {
  submitForm = new Subject<{ submit: boolean }>();
  submitFormSubscription: Subscription;
  constructor(
    protected translate: TranslateService,
    protected drawerService: NzDrawerService,
    protected msg: NzMessageService,
    periodosService: PeriodosService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(periodosService, nzDropdownService, breakpointObserver);
  }

  _openForm(id?: number) {
    this.submitFormSubscription = this.submitForm
      .asObservable()
      .subscribe(value => {
        this.searchData();
      });

    this.translate.get('lambe.cheques').subscribe((res: string) => {
      this.drawerRef = this.drawerService.create<
        PeriodosFormComponent,
        { id: number; valueChange: Subject<{ submit: boolean }> }
      >({
        nzTitle: res,
        nzWidth: this.initialDrawerWidth,
        nzContent: PeriodosFormComponent,
        nzContentParams: { id, valueChange: this.submitForm },
      });

      this.drawerRef.afterClose.subscribe(
        (data: { submit: boolean } | undefined) => {
          if (!data) return;
          if (data.submit) this.searchData();
          this.submitFormSubscription.unsubscribe();
        },
      );

      this.drawerRef.afterOpen.subscribe(data => {
        this.closeMenu();
      });
    });
  }

  eliminar(id: number) {
    this.dataService.delete(id).subscribe(data => {
      this.msg.success(`Eliminado!!`);
      this.searchData();
    });
  }
}
