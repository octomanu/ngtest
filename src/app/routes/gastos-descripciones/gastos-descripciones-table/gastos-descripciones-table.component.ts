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
import { GastosDescripcionesState } from 'redux/gastos-descripciones/gastos-descripciones.reducer';
import * as gdActions from 'redux/gastos-descripciones/gastos-descripciones.actions';

@Component({
  selector: 'app-gastos-descripciones-table',
  templateUrl: './gastos-descripciones-table.component.html',
  styles: [],
})
export class GastosDescripcionesTableComponent extends TableComponent
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
      .select('gastosDescripcionesState')
      .subscribe((state: GastosDescripcionesState) => {
        if (!state.initialized) {
          this.store.dispatch(new gdActions.LoadGastosDescripcionesAction());
        }
        this.tableLambe.data = state.paginator.data;
        this.tableLambe.loading = state.loading;
        this.tableLambe.total = state.paginator.recordsFiltered;
        this.paginatorParams = { ...state.paginator.parametros };
      });

    this.subscripctions.push(sub);
  }

  pageChange(page: number) {
    this.store.dispatch(new gdActions.ChangeParamsAction(this.paginatorParams));
  }

  editar(id: number) {
    this.openForm.emit(id);
  }

  eliminar(id: number) {
    this.store.dispatch(new gdActions.DeleteGastosDescripcionesAction(id));
  }

  changeOrder(field: string, order: string) {
    this.store.dispatch(new gdActions.ChangeOrderAction(field, order));
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>) {
    this.dropdown = this.nzDropdownService.create($event, template);
  }
}
