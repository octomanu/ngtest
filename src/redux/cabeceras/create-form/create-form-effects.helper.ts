import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { CabecerasService } from '@core/http/cabeceras/cabeceras.service';
import { NzMessageService } from 'ng-zorro-antd';
import { tap } from 'rxjs/operators';
import { CabecerasFormComponent } from 'app/routes/cabeceras/cabeceras-form/cabeceras-form.component';
import { DrawerService } from '@shared/utils/drawer.service';
@Injectable()
export class CreateFormEffectsHelper {
  protected viewportSubscription: Subscription;

  constructor(
    protected cabecerasService: CabecerasService,
    protected drawerService: DrawerService,
    protected msg: NzMessageService,
  ) {}

  openCreateForm() {
    return this.drawerService.create(
      'global.servicios',
      'right',
      CabecerasFormComponent,
    );
  }

  saveData(data) {
    return this.cabecerasService
      .create(data)
      .pipe(tap(() => this.msg.success(`global.actualizado`)));
  }
}
