import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import {
  NzMessageService,
  NzDrawerService,
  NzDropdownService,
} from 'ng-zorro-antd';
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
  protected submitForm = new Subject<{ submit: boolean }>();
  constructor(
    private msg: NzMessageService,
    private translate: TranslateService,
    private drawerService: NzDrawerService,
    notasService: NotasService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(notasService, nzDropdownService, breakpointObserver);
  }

  _openForm(id?: number) {
    const valueChangeSubscription = this.submitForm
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
