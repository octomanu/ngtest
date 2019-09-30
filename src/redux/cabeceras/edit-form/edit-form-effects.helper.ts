import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { CabecerasService } from '@core/http/cabeceras/cabeceras.service';
import { NzMessageService } from 'ng-zorro-antd';
import { tap } from 'rxjs/operators';
import { CabecerasFormComponent } from 'app/routes/cabeceras/cabeceras-form/cabeceras-form.component';
import { editId } from './edit-form.selectors';
import { DrawerService } from '@shared/utils/drawer.service';
@Injectable()
export class EditFormEffectsHelper {
  constructor(
    private appStore: Store<AppState>,
    protected cabecerasService: CabecerasService,
    protected msg: NzMessageService,
    protected drawerService: DrawerService,
  ) {}

  openEditForm() {
    return this.drawerService.create(
      'global.servicios',
      'right',
      CabecerasFormComponent,
    );
  }

  updateData(data) {
    return this.cabecerasService
      .update(data.id, data)
      .pipe(tap(() => this.msg.success(`global.actualizado`)));
  }

  searchFormData() {
    return this.cabecerasService.findObs(this.appStore.select(editId));
  }
}
