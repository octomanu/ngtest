import {
  Component,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { TableComponent } from 'app/classes/table-component.class';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { NzDropdownService } from 'ng-zorro-antd';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import * as ordenesPagoActions from 'redux/ordenes-pago/ordenes-pago.actions';
import { OrdenesPagoState } from 'redux/ordenes-pago/ordenes-pago.reducer';
import { selectOrdenesPago } from 'redux/ordenes-pago/ordenes-pago.selectors';

@Component({
  selector: 'app-ordenes-pago-table',
  templateUrl: './ordenes-pago-table.component.html',
  styles: [],
})
export class OrdenesPagoTableComponent extends TableComponent
  implements OnInit {
  @Output() payOrder: EventEmitter<number> = new EventEmitter();
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
      .select(selectOrdenesPago)
      .subscribe((state: OrdenesPagoState) => {
        if (!state.initialized) {
          this.store.dispatch(new ordenesPagoActions.LoadOrdenesPagosAction());
        }
        this.tableLambe.data = state.paginator.data;
        this.tableLambe.loading = state.loading;
        this.tableLambe.total = state.paginator.recordsFiltered;
        this.paginatorParams = { ...state.paginator.parametros };
      });

    this.subscripctions.push(sub);
  }

  pay(id: number) {
    console.log(id);
    this.payOrder.emit(id);
  }

  pageChange(page: number) {
    this.store.dispatch(
      new ordenesPagoActions.ChangeParamsAction(this.paginatorParams),
    );
  }

  editar(id: number) {
    this.openForm.emit(id);
  }

  eliminar(id: number) {
    this.store.dispatch(new ordenesPagoActions.DeleteOrdenesPagosAction(id));
  }

  changeOrder(field: string, order: string) {
    this.store.dispatch(new ordenesPagoActions.ChangeOrderAction(field, order));
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>) {
    this.dropdown = this.nzDropdownService.create($event, template);
  }
}
