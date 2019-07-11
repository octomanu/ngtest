import { Component } from '@angular/core';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { Subject, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import {
  NzDrawerService,
  NzMessageService,
  NzDropdownService,
} from 'ng-zorro-antd';
import { ServiciosService } from '@core/http/servicios/servicios.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ServiciosFormComponent } from '../servicios-form/servicios-form.component';

@Component({
  selector: 'app-servicios-table',
  templateUrl: './servicios-table.component.html',
  styles: [],
})
export class ServiciosTableComponent extends TableLambe {
  submitForm = new Subject<{ submit: boolean }>();
  submitFormSubscription: Subscription;
  constructor(
    protected translate: TranslateService,
    protected drawerService: NzDrawerService,
    protected msg: NzMessageService,
    serviciosService: ServiciosService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(serviciosService, nzDropdownService, breakpointObserver);
  }

  _openForm(id?: number) {
    this.submitFormSubscription = this.submitForm
      .asObservable()
      .subscribe(value => {
        this.searchData();
      });

    this.translate.get('lambe.cheques').subscribe((res: string) => {
      this.drawerRef = this.drawerService.create<
        ServiciosFormComponent,
        { id: number; valueChange: Subject<{ submit: boolean }> }
      >({
        nzTitle: res,
        nzWidth: this.initialDrawerWidth,
        nzContent: ServiciosFormComponent,
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
