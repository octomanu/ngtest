import {
  Component,
  OnInit,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { ButtonsFacade } from '../facade/buttons.facade ';

@Component({
  selector: 'app-gastos-buttons',
  templateUrl: './gastos-buttons.component.html',
  styles: [],
})
export class GastosButtonsComponent implements OnInit {
  tooltips: {
    btnCrear: TemplateRef<TooltipHelpComponent>;
    btnFiltros: TemplateRef<TooltipHelpComponent>;
    btnNoFltros: TemplateRef<TooltipHelpComponent>;
  };

  constructor(
    public tooltipBuilder: TooltipHelperService,
    private viewContainerRef: ViewContainerRef,
    public buttons: ButtonsFacade,
  ) {}

  ngOnInit() {
    this.tooltipBuilder.setViewContainerRef(this.viewContainerRef);
    this.tooltips = this.tooltipBuilder.getButtonsTooltips();
  }

  openFilter() {
    this.buttons.openFilter();
  }

  create() {
    this.buttons.create();
  }

  clearFilter() {
    this.buttons.clearFilter();
  }

  submitDue() {
    this.buttons.saveDues();
  }
}
