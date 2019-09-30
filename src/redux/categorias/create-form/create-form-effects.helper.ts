import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { tap } from 'rxjs/operators';
import { DrawerService } from '@shared/utils/drawer.service';
import { CategoriasService } from '@core/http/categorias/categorias.service';
import { CategoriasFormComponent } from 'app/routes/categorias/categorias-form/categorias-form.component';
@Injectable()
export class CreateFormEffectsHelper {
  protected viewportSubscription: Subscription;

  constructor(
    protected categoriasService: CategoriasService,
    protected drawerService: DrawerService,
    protected msg: NzMessageService,
  ) {}

  openCreateForm() {
    return this.drawerService.create(
      'global.categorias',
      'right',
      CategoriasFormComponent,
    );
  }

  saveData(data) {
    return this.categoriasService
      .create(data)
      .pipe(tap(() => this.msg.success(`global.actualizado`)));
  }
}
