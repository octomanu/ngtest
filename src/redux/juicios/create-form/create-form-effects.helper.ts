import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { tap } from 'rxjs/operators';
import { DrawerService } from '@shared/utils/drawer.service';
import { JuiciosService } from '@core/http/juicios/juicios.service';
import { JuiciosFormComponent } from 'app/routes/juicios/juicios-form/juicios-form.component';
@Injectable()
export class CreateFormEffectsHelper {
  protected viewportSubscription: Subscription;

  constructor(
    protected juiciosService: JuiciosService,
    protected drawerService: DrawerService,
    protected msg: NzMessageService,
  ) {}

  openCreateForm() {
    return this.drawerService.create(
      'global.juicios',
      'right',
      JuiciosFormComponent,
    );
  }

  saveData(data) {
    return this.juiciosService
      .create(data)
      .pipe(tap(() => this.msg.success(`global.actualizado`)));
  }
}
