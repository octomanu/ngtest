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
import {
  NzDropdownService,
  NzModalService,
  NzDrawerService,
} from 'ng-zorro-antd';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import { SueldosState } from 'redux/sueldos/sueldos.reducer';
import * as sueldosActions from 'redux/sueldos/sueldos.actions';
import { SueldosService } from '@core/http/sueldos/sueldos.service';
import { PreviewSalaryComponent } from '../preview-salary/preview-salary.component';
import { TranslateService } from '@ngx-translate/core';
import { selectSueldos } from 'redux/sueldos/sueldos.selectors';
@Component({
  selector: 'app-sueldos-table',
  templateUrl: './sueldos-table.component.html',
  styles: [],
})
export class SueldosTableComponent extends TableComponent implements OnInit {
  tooltips: {
    tableHeader: TemplateRef<TooltipHelpComponent>;
    tableBody: TemplateRef<TooltipHelpComponent>;
  };

  constructor(
    public store: Store<AppState>,
    public nzDropdownService: NzDropdownService,
    public tooltipBuilder: TooltipHelperService,
    viewContainerRef: ViewContainerRef,
    protected sueldosService: SueldosService,
    protected modalService: NzModalService,
    protected translateService: TranslateService,
    protected drawerService: NzDrawerService,
  ) {
    super();
    this.tooltipBuilder.setViewContainerRef(viewContainerRef);
    this.tooltips = this.tooltipBuilder.getTableTooltips();
  }

  ngOnInit() {
    const sub = this.store
      .select(selectSueldos)
      .subscribe((state: SueldosState) => {
        if (!state.initialized) {
          this.store.dispatch(new sueldosActions.LoadSueldosAction());
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
      new sueldosActions.ChangeParamsAction(this.paginatorParams),
    );
  }

  editar(id: number) {
    this.openForm.emit(id);
  }

  generateReceipt(id: number) {
    this.translateService
      .get('global.sueldo_preview')
      .subscribe((res: string) => {
        this.drawerService.create({
          nzWidth: '100%',
          nzTitle: '',
          nzContent: PreviewSalaryComponent,
          nzPlacement: 'right',
          nzContentParams: { id },
        });
      });
  }

  eliminar(id: number) {
    this.store.dispatch(new sueldosActions.DeleteSueldosAction(id));
  }

  changeOrder(field: string, order: string) {
    this.store.dispatch(new sueldosActions.ChangeOrderAction(field, order));
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>) {
    this.dropdown = this.nzDropdownService.create($event, template);
  }
}
