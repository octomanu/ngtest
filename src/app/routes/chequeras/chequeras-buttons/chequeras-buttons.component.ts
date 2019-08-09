import {
  Component,
  Input,
  Output,
  TemplateRef,
  EventEmitter,
  ViewContainerRef,
} from '@angular/core';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import { ChequerasTableFilterComponent } from '../chequeras-table-filter/chequeras-table-filter.component';
import { ChangeFilterAction } from 'redux/chequeras/chequeras.actions';

@Component({
  selector: 'app-chequeras-buttons',
  templateUrl: './chequeras-buttons.component.html',
  styles: [],
})
export class ChequerasButtonsComponent {
  @Input() help: boolean;
  @Input() keepHelp: boolean;
  @Input() smallViewport: boolean;
  @Output() openForm = new EventEmitter();
  tooltips: {
    btnCrear: TemplateRef<TooltipHelpComponent>;
    btnFiltros: TemplateRef<TooltipHelpComponent>;
    btnNoFltros: TemplateRef<TooltipHelpComponent>;
  };

  constructor(
    public store: Store<AppState>,
    public translate: TranslateService,
    public drawerService: NzDrawerService,
    public tooltipBuilder: TooltipHelperService,
    viewContainerRef: ViewContainerRef,
  ) {
    this.tooltipBuilder.setViewContainerRef(viewContainerRef);
    this.tooltips = this.tooltipBuilder.getButtonsTooltips();
  }

  openFilter() {
    this.translate.get('global.filtros').subscribe((res: string) => {
      this.drawerService.create({
        nzTitle: res,
        nzWidth: this.smallViewport ? '100%' : '50%',
        nzContent: ChequerasTableFilterComponent,
        nzPlacement: 'left',
      });
    });
  }

  crear() {
    this.openForm.emit();
  }

  clearFilter() {
    this.store.dispatch(new ChangeFilterAction({ descripcion: null }));
  }
}
