import {
  Component,
  Input,
  TemplateRef,
  ViewContainerRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { TranslateService } from '@ngx-translate/core';
import { ServiciosFilterComponent } from '../servicios-filter/servicios-filter.component';
import { NzDrawerService } from 'ng-zorro-antd';
import { ServiciosFormComponent } from '../servicios-form/servicios-form.component';
import { ChangeFilterAction } from 'redux/servicios/servicios.actions';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { TooltipHelperService } from '../helpers/tooltip-helper.service';

@Component({
  selector: 'app-servicios-buttons',
  templateUrl: './servicios-buttons.component.html',
  styles: [],
})
export class ServiciosButtonsComponent {
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
        nzContent: ServiciosFilterComponent,
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
