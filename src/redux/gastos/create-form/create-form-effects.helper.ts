import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { tap } from 'rxjs/operators';
import { DrawerService } from '@shared/utils/drawer.service';
import { GastosService } from '@core/http/gastos/gastos.service';
import { GastosFormComponent } from 'app/routes/gastos/gastos-form/gastos-form.component';
@Injectable()
export class CreateFormEffectsHelper {
  protected viewportSubscription: Subscription;

  constructor(
    protected service: GastosService,
    protected drawerService: DrawerService,
    protected msg: NzMessageService,
  ) {}

  openCreateForm() {
    return this.drawerService.create(
      'global.gastos',
      'right',
      GastosFormComponent,
    );
  }

  saveData(data) {
    return this.service
      .create(data)
      .pipe(tap(() => this.msg.success(`global.actualizado`)));
  }
}
