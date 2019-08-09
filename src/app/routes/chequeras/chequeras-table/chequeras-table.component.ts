import {
  Component,
  OnInit,
  TemplateRef,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { TableComponent } from 'app/classes/table-component.class';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { NzDropdownService } from 'ng-zorro-antd';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import { ChequerasState } from 'redux/chequeras/chequeras.reducer';
import * as chequerasAction from 'redux/chequeras/chequeras.actions';
@Component({
  selector: 'app-chequeras-table',
  templateUrl: './chequeras-table.component.html',
  styles: [],
})
export class ChequerasTableComponent extends TableComponent
  implements OnInit, OnDestroy {
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
      .select('chequerasState')
      .subscribe((state: ChequerasState) => {
        if (!state.initialized) {
          this.store.dispatch(new chequerasAction.LoadChequerasAction());
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
      new chequerasAction.ChangeParamsAction(this.paginatorParams),
    );
  }

  editar(id: number) {
    this.openForm.emit(id);
  }

  eliminar(id: number) {
    this.store.dispatch(new chequerasAction.DeleteChequerasAction(id));
  }

  changeOrder(field: string, order: string) {
    this.store.dispatch(new chequerasAction.ChangeOrderAction(field, order));
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>) {
    this.dropdown = this.nzDropdownService.create($event, template);
  }
}
