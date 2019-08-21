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
import { CuentaCorrienteUfState } from 'redux/cuenta-corriente-uf/cuenta-corriente-uf-reducer';
import * as ccuActions from 'redux/cuenta-corriente-uf/cuenta-corriente-uf-actions';

@Component({
  selector: 'app-cuenta-corriente-uf-table',
  templateUrl: './cuenta-corriente-uf-table.component.html',
  styles: [],
})
export class CuentaCorrienteUfTableComponent extends TableComponent
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
      .select('cuentaCorrienteUf')
      .subscribe((state: CuentaCorrienteUfState) => {
        if (state.id_uf) {
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
      new ccuActions.ChangeParamsAction(this.paginatorParams),
    );
  }

  editar(id: number) {
    this.openForm.emit(id);
  }

  changeOrder(field: string, order: string) {
    this.store.dispatch(new ccuActions.ChangeOrderAction(field, order));
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>) {
    this.dropdown = this.nzDropdownService.create($event, template);
  }
}
