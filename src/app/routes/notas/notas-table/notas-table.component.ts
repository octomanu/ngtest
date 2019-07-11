import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { NzDrawerService, NzDropdownService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { NotasService } from '@core/http/notas/notas.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { NotasFormComponent } from '../notas-form/notas-form.component';

@Component({
  selector: 'app-notas-table',
  templateUrl: './notas-table.component.html',
  styles: [],
})
export class NotasTableComponent extends TableLambe
  implements OnInit, OnDestroy {
  submitForm = new Subject<{ submit: boolean }>();
  submitFormSubscription: Subscription;
  constructor(
    protected translate: TranslateService,
    protected drawerService: NzDrawerService,
    notasService: NotasService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(notasService, nzDropdownService, breakpointObserver);
  }

  _openForm(id?: number) {
    this.submitFormSubscription = this.submitForm
      .asObservable()
      .subscribe(value => {
        this.searchData();
      });

    this.translate.get('lambe.cheques').subscribe((res: string) => {
      this.drawerRef = this.drawerService.create<
        NotasFormComponent,
        { id: number; valueChange: Subject<{ submit: boolean }> }
      >({
        nzTitle: res,
        nzWidth: this.initialDrawerWidth,
        nzContent: NotasFormComponent,
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
}
