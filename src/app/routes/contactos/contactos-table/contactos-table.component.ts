import { Component, OnInit } from '@angular/core';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { Subject, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import {
  NzDrawerService,
  NzMessageService,
  NzDropdownService,
} from 'ng-zorro-antd';
import { ContactosService } from '@core/http/contactos/contactos.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ContactosFormComponent } from '../contactos-form/contactos-form.component';

@Component({
  selector: 'app-contactos-table',
  templateUrl: './contactos-table.component.html',
  styles: [],
})
export class ContactosTableComponent extends TableLambe {
  submitForm = new Subject<{ submit: boolean }>();
  submitFormSubscription: Subscription;
  constructor(
    protected translate: TranslateService,
    protected drawerService: NzDrawerService,
    protected msg: NzMessageService,
    serviciosService: ContactosService,
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
        ContactosFormComponent,
        { id: number; valueChange: Subject<{ submit: boolean }> }
      >({
        nzTitle: res,
        nzWidth: this.initialDrawerWidth,
        nzContent: ContactosFormComponent,
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
