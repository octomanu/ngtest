import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { NzMessageService } from 'ng-zorro-antd';
import { tap } from 'rxjs/operators';
import { editId } from './edit-form.selectors';
import { DrawerService } from '@shared/utils/drawer.service';
import { JuiciosService } from '@core/http/juicios/juicios.service';
import { JuiciosFormComponent } from 'app/routes/juicios/juicios-form/juicios-form.component';
@Injectable()
export class EditFormEffectsHelper {
  constructor(
    private appStore: Store<AppState>,
    protected juiciosService: JuiciosService,
    protected msg: NzMessageService,
    protected drawerService: DrawerService,
  ) {}

  openEditForm() {
    return this.drawerService.create(
      'global.juicios',
      'right',
      JuiciosFormComponent,
    );
  }

  updateData(data) {
    return this.juiciosService
      .update(data.id, data)
      .pipe(tap(() => this.msg.success(`global.actualizado`)));
  }

  searchFormData() {
    return this.juiciosService.findObs(this.appStore.select(editId));
  }
}
