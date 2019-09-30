import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { NzMessageService } from 'ng-zorro-antd';
import { tap } from 'rxjs/operators';
import { editId } from './edit-form.selectors';
import { DrawerService } from '@shared/utils/drawer.service';
import { CategoriasService } from '@core/http/categorias/categorias.service';
import { CategoriasComponent } from 'app/routes/categorias/categorias.component';
@Injectable()
export class EditFormEffectsHelper {
  constructor(
    private appStore: Store<AppState>,
    protected categoriasService: CategoriasService,
    protected msg: NzMessageService,
    protected drawerService: DrawerService,
  ) {}

  openEditForm() {
    return this.drawerService.create(
      'global.categorias',
      'right',
      CategoriasComponent,
    );
  }

  updateData(data) {
    return this.categoriasService
      .update(data.id, data)
      .pipe(tap(() => this.msg.success(`global.actualizado`)));
  }

  searchFormData() {
    return this.categoriasService.findObs(this.appStore.select(editId));
  }
}
