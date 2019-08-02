import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { TemplateRef, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { ServiciosState } from 'redux/servicios/servicios.reducer';
import * as serviciosActions from 'redux/servicios/servicios.actions';
import { TooltipHelperService } from '../helpers/tooltip-helper.service';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { TableComponent } from 'app/classes/table-component.class';
import { NzDropdownService } from 'ng-zorro-antd';

@Component({
  selector: 'app-servicios-table',
  templateUrl: './servicios-table.component.html',
  styles: [],
})
export class ServiciosTableComponent extends TableComponent
  implements OnInit, OnDestroy {
  @Input() help: boolean;
  @Input() keepHelp: boolean;
  @Output() openForm = new EventEmitter();

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
    const sub = this.store
      .select('serviciosState')
      .subscribe((state: ServiciosState) => {
        if (!state.initialized) {
          this.store.dispatch(new serviciosActions.LoadServiciosAction());
        }
        this.tableLambe.data = state.paginator.data;
        this.tableLambe.loading = state.loading;
        this.tableLambe.total = state.paginator.recordsFiltered;
        this.paginatorParams = { ...state.paginator.parametros };
      });

    this.subscripctions.push(sub);
  }

  pageChange(page: number) {
    this.store.dispatch(
      new serviciosActions.ChangeParamsAction(this.paginatorParams),
    );
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
