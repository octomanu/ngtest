import { Component, ViewContainerRef, TemplateRef } from '@angular/core';
import { TableComponent } from 'app/classes/table-component.class';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { NzDropdownService } from 'ng-zorro-antd';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import * as cbActions from 'redux/cuentas-bancarias/cuentas-bancarias.actions';
import { CuentasBancariasState } from 'redux/cuentas-bancarias/cuentas-bancarias.reducer';

@Component({
  selector: 'app-cuentas-bancarias-table',
  templateUrl: './cuentas-bancarias-table.component.html',
  styles: [],
})
export class CuentasBancariasTableComponent extends TableComponent {
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
      .select('cuentasBancariasState')
      .subscribe((state: CuentasBancariasState) => {
        if (!state.initialized) {
          this.store.dispatch(new cbActions.LoadCuentasBancariasAction());
        }
        this.tableLambe.data = state.paginator.data;
        this.tableLambe.loading = state.loading;
        this.tableLambe.total = state.paginator.recordsFiltered;
        this.paginatorParams = { ...state.paginator.parametros };
      });

    this.subscripctions.push(sub);
  }

  pageChange(page: number) {
    this.store.dispatch(new cbActions.ChangeParamsAction(this.paginatorParams));
  }

  editar(id: number) {
    this.openForm.emit(id);
  }

  eliminar(id: number) {
    this.store.dispatch(new cbActions.DeleteCuentasBancariasAction(id));
  }

  changeOrder(field: string, order: string) {
    this.store.dispatch(new cbActions.ChangeOrderAction(field, order));
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>) {
    this.dropdown = this.nzDropdownService.create($event, template);
  }
}
