import { Component } from '@angular/core';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { TranslateService } from '@ngx-translate/core';
import {
  NzDrawerService,
  NzMessageService,
  NzDropdownService,
} from 'ng-zorro-antd';
import { ServiciosService } from '@core/http/servicios/servicios.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ServiciosFormComponent } from '../servicios-form/servicios-form.component';
import { Store, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { ServiciosState } from 'redux/servicios/servicios.reducer';
import * as serviciosActions from 'redux/servicios/servicios.actions';
@Component({
  selector: 'app-servicios-table',
  templateUrl: './servicios-table.component.html',
  styles: [],
})
export class ServiciosTableComponent extends TableLambe {
  drawerContent = ServiciosFormComponent;
  drawerTitle = 'global.servicios';

  serviceState = createFeatureSelector<AppState, ServiciosState>(
    'serviciosState',
  );

  constructor(
    protected store: Store<AppState>,
    translate: TranslateService,
    drawerService: NzDrawerService,
    msg: NzMessageService,
    serviciosService: ServiciosService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(
      serviciosService,
      nzDropdownService,
      breakpointObserver,
      translate,
      drawerService,
      msg,
    );
  }

  ngOnInit() {
    this.store.select('serviciosState').subscribe((state: ServiciosState) => {
      if (!state.initialized) {
        this.store.dispatch(new serviciosActions.LoadServiciosAction());
      }
      this.tableLambe.data = state.paginator.data;
      this.tableLambe.loading = state.loading;
      this.tableLambe.total = state.paginator.recordsFiltered;
      this.paginatorParams.page = state.paginator.parametros.page;
      this.paginatorParams.page_size = state.paginator.parametros.page_size;
      this.paginatorParams.sort_field = state.paginator.parametros.sort_field;
      this.paginatorParams.sort_order = state.paginator.parametros.sort_order;
    });
  }
  ngOnDestroy() {}

  pageChange(page: number) {
    this.store.dispatch(
      new serviciosActions.ChangeParamsAction(this.paginatorParams),
    );
  }

  /**
   * Busca los datos al inico y despues de aplicar filtros y orden
   */
  searchData(reset: boolean = false): void {
    return;
  }

  sort(sort: { key: string; value: string }): void {
    const field = sort.key;
    const order = sort.value ? sort.value.replace('end', '') : sort.value;
    this.store.dispatch(new serviciosActions.ChangeOrderAction(field, order));
  }
}
