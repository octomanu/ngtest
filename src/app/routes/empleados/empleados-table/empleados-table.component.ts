import { Component } from '@angular/core';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { Subscription, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import {
  NzMessageService,
  NzDropdownService,
  NzDrawerService,
} from 'ng-zorro-antd';
import { ContactosService } from '@core/http/contactos/contactos.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { EmpleadosFormComponent } from '../empleados-form/empleados-form.component';

@Component({
  selector: 'app-empleados-table',
  templateUrl: './empleados-table.component.html',
  styles: [],
})
export class EmpleadosTableComponent extends TableLambe {
  submitForm = new Subject<{ submit: boolean }>();
  submitFormSubscription: Subscription;
  constructor(
    protected translate: TranslateService,
    protected drawerService: NzDrawerService,
    protected msg: NzMessageService,
    empleadosService: ContactosService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(empleadosService, nzDropdownService, breakpointObserver);
  }

  _openForm(id?: number) {
    this.submitFormSubscription = this.submitForm
      .asObservable()
      .subscribe(value => {
        this.searchData();
      });

    this.translate.get('lambe.cheques').subscribe((res: string) => {
      this.drawerRef = this.drawerService.create<
        EmpleadosFormComponent,
        { id: number; valueChange: Subject<{ submit: boolean }> }
      >({
        nzTitle: res,
        nzWidth: this.initialDrawerWidth,
        nzContent: EmpleadosFormComponent,
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
