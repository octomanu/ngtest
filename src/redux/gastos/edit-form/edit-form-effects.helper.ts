import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { NzMessageService } from 'ng-zorro-antd';
import { tap } from 'rxjs/operators';
import { editId } from './edit-form.selectors';
import { DrawerService } from '@shared/utils/drawer.service';
import { GastosFormComponent } from 'app/routes/gastos/gastos-form/gastos-form.component';
import { GastosService } from '@core/http/gastos/gastos.service';
@Injectable()
export class EditFormEffectsHelper {
  constructor(
    private appStore: Store<AppState>,
    protected gastosService: GastosService,
    protected msg: NzMessageService,
    protected drawerService: DrawerService,
  ) {}

  openEditForm() {
    return this.drawerService.create(
      'global.gastos',
      'right',
      GastosFormComponent,
    );
  }

  updateData(data) {
    return this.gastosService
      .update(data.id, data)
      .pipe(tap(() => this.msg.success(`global.actualizado`)));
  }

  searchFormData() {
    return this.gastosService.findObs(this.appStore.select(editId));
  }
}
