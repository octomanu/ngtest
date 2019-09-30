import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { tap, switchMap } from 'rxjs/operators';
import { DrawerService } from '@shared/utils/drawer.service';
import { GastosService } from '@core/http/gastos/gastos.service';
import { GastosFormComponent } from 'app/routes/gastos/gastos-form/gastos-form.component';
import { TranslateService } from '@ngx-translate/core';
@Injectable()
export class CreateFormEffectsHelper {
  protected viewportSubscription: Subscription;

  constructor(
    protected service: GastosService,
    protected drawerService: DrawerService,
    protected msg: NzMessageService,
    protected translateService: TranslateService,
  ) {}

  openCreateForm() {
    return this.drawerService.create(
      'global.gastos',
      'right',
      GastosFormComponent,
    );
  }

  saveData(data) {
    return this.service.create(data).pipe(
      switchMap(() => this.translateService.get('global.creado')),
      tap(translation => this.msg.success(translation)),
    );
  }
}
