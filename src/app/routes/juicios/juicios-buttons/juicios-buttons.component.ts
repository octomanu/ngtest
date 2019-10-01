import {
  Component,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import { ButtonsFacade } from '../facade/buttons.facade';

@Component({
  selector: 'app-juicios-buttons',
  templateUrl: './juicios-buttons.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JuiciosButtonsComponent implements OnInit {
  tooltips: {
    btnCrear: TemplateRef<TooltipHelpComponent>;
    btnFiltros: TemplateRef<TooltipHelpComponent>;
    btnNoFltros: TemplateRef<TooltipHelpComponent>;
  };

  constructor(
    public buttons: ButtonsFacade,
    public tooltipBuilder: TooltipHelperService,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit() {
    this.tooltipBuilder.setViewContainerRef(this.viewContainerRef);
    this.tooltips = this.tooltipBuilder.getButtonsTooltips();
  }

  openFilter() {
    this.buttons.openFilterForm();
  }

  create() {
    this.buttons.openCreateForm();
  }

  clearFilter() {
    this.buttons.clearFilter();
  }
}
