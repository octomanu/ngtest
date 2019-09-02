import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TemplateRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import * as serviciosActions from 'redux/servicios/servicios.actions';
import { TooltipHelperService } from '../helpers/tooltip-helper.service';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { TableComponent } from 'app/classes/table-component.class';
import { NzDropdownService } from 'ng-zorro-antd';
import {
  selectPaginatorData,
  selectPaginatorParams,
  selectLoading,
  selectPaginatorTotal,
  selectPaginatorPage,
  selectPaginatorPageSize,
} from 'redux/servicios/servicios.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-servicios-table',
  templateUrl: './servicios-table.component.html',
  styles: [],
})
export class ServiciosTableComponent extends TableComponent
  implements OnInit, OnDestroy {
  paginatorData: Observable<any>;
  paginatorParameters: Observable<any>;
  paginatorLoading: Observable<any>;
  paginatorTotal: Observable<any>;
  paginatorPage: Observable<any>;
  paginatorPageSize: Observable<any>;
  tooltips: {
    tableHeader: TemplateRef<TooltipHelpComponent>;
    tableBody: TemplateRef<TooltipHelpComponent>;
  };

  constructor(
    public store: Store<AppState>,
    public nzDropdownService: NzDropdownService,
    public tooltipBuilder: TooltipHelperService,
    viewContainerRef: ViewContainerRef,
  ) {
    super();
    this.tooltipBuilder.setViewContainerRef(viewContainerRef);
    this.tooltips = this.tooltipBuilder.getTableTooltips();
  }

  ngOnInit() {
    this.store.dispatch(new serviciosActions.InitTableAction());
    this.paginatorData = this.store.select(selectPaginatorData);
    this.paginatorParameters = this.store.select(selectPaginatorParams);
    this.paginatorLoading = this.store.select(selectLoading);
    this.paginatorTotal = this.store.select(selectPaginatorTotal);
    this.paginatorPage = this.store.select(selectPaginatorPage);
    this.paginatorPageSize = this.store.select(selectPaginatorPageSize);
  }

  pageChange(page: number) {
    this.store.dispatch(new serviciosActions.ChangePageAction({ page }));
  }

  editar(id: number) {
    this.openForm.emit(id);
  }

  eliminar(id: number) {
    this.store.dispatch(new serviciosActions.DeleteServicioAction(id));
  }

  changeOrder(field: string, order: string) {
    this.store.dispatch(new serviciosActions.ChangeOrderAction(field, order));
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>) {
    this.dropdown = this.nzDropdownService.create($event, template);
  }
}
