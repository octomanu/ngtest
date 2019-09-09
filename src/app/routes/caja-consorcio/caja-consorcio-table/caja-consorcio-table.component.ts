import {
  Component,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TableComponent } from 'app/classes/table-component.class';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { NzDropdownService } from 'ng-zorro-antd';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import { CajaConsorcioState } from 'redux/caja-consorcio/caja-consorcio.reducer';
import * as ccActions from 'redux/caja-consorcio/caja-consorcio.actions';
import { selectCajaConsorcio } from 'redux/caja-consorcio/caja-consorcio.selectors';

@Component({
  selector: 'app-caja-consorcio-table',
  templateUrl: './caja-consorcio-table.component.html',
  styles: [],
})
export class CajaConsorcioTableComponent extends TableComponent
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
      .select(selectCajaConsorcio)
      .subscribe((state: CajaConsorcioState) => {
        if (!state.initialized) {
          this.store.dispatch(new ccActions.LoadCajaConsorcioAction());
        }
        console.log('hi');
        this.tableLambe.data = state.paginator.data;
        this.tableLambe.loading = state.loading;
        this.tableLambe.total = state.paginator.recordsFiltered;
        this.paginatorParams = { ...state.paginator.parametros };
      });

    this.subscripctions.push(sub);
  }

  pageChange(page: number) {
    this.store.dispatch(new ccActions.ChangeParamsAction(this.paginatorParams));
  }

  editar(id: number) {
    this.openForm.emit(id);
  }

  changeOrder(field: string, order: string) {
    this.store.dispatch(new ccActions.ChangeOrderAction(field, order));
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>) {
    this.dropdown = this.nzDropdownService.create($event, template);
  }
}
