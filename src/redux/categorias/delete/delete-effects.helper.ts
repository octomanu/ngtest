import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { CategoriasService } from '@core/http/categorias/categorias.service';
import { CategoriasPageRequest } from '../page/page.actions';
@Injectable()
export class DeleteEffectsHelper {
  protected smallViewport: boolean;
  protected editId: number;
  protected viewportSubscription: Subscription;

  constructor(
    private appStore: Store<AppState>,
    protected categoriasService: CategoriasService,
    protected translateService: TranslateService,
    protected msg: NzMessageService,
  ) {}

  deleteData(id: number) {
    return this.categoriasService.delete(id).pipe(
      tap(() => {
        this.appStore.dispatch(new CategoriasPageRequest());
        this.msg.success(`Eliminado`);
      }),
    );
  }
}
