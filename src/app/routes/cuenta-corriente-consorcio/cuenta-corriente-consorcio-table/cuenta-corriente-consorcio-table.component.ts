import {
  Component,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TableComponent } from 'app/classes/table-component.class';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { NzDropdownService } from 'ng-zorro-antd';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import { CuentaCorrienteConsorcioState } from 'redux/cuenta-corriente-consorcio/cuenta-corriente-consorcio.reducer';
import * as cccActions from 'redux/cuenta-corriente-consorcio/cuenta-corriente-consorcio.actions';

@Component({
  selector: 'app-cuenta-corriente-consorcio-table',
  templateUrl: './cuenta-corriente-consorcio-table.component.html',
  styles: [],
})
export class CuentaCorrienteConsorcioTableComponent extends TableComponent
  implements OnInit {
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
      .select('cuentaCorrienteConsorcio')
      .subscribe((state: CuentaCorrienteConsorcioState) => {
        if (state.id_consorcio) {
          this.tableLambe.data = state.paginator.data;
          this.tableLambe.loading = state.loading;
          this.tableLambe.total = state.paginator.recordsFiltered;
          this.paginatorParams = { ...state.paginator.parametros };
        } else {
          this.tableLambe.data = [];
          this.tableLambe.loading = false;
          this.tableLambe.total = 0;
          this.paginatorParams = {
            page: null,
            page_size: null,
            sort_field: null,
            sort_order: null,
          };
        }
      });

    this.subscripctions.push(sub);
  }

  pageChange(page: number) {
    this.store.dispatch(
      new cccActions.ChangeParamsAction(this.paginatorParams),
    );
  }

  editar(id: number) {
    this.openForm.emit(id);
  }

  changeOrder(field: string, order: string) {
    this.store.dispatch(new cccActions.ChangeOrderAction(field, order));
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>) {
    this.dropdown = this.nzDropdownService.create($event, template);
  }
}
