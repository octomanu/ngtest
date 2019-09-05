import { Component, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import {
  OpenFilterForm,
  FilterRequest,
} from 'redux/cabeceras/filter-form/filter-form.actions';
import { OpenCreateForm } from 'redux/cabeceras/create-form/create-form.actions';
@Component({
  selector: 'app-cabeceras-buttons',
  templateUrl: './cabeceras-buttons.component.html',
  styles: [],
})
export class CabecerasButtonsComponent {
  @Input() help: boolean;
  @Input() keepHelp: boolean;
  tooltips: {
    btnCrear: TemplateRef<TooltipHelpComponent>;
    btnFiltros: TemplateRef<TooltipHelpComponent>;
    btnNoFltros: TemplateRef<TooltipHelpComponent>;
  };

  constructor(
    private store: Store<AppState>,
    public tooltipBuilder: TooltipHelperService,
    viewContainerRef: ViewContainerRef,
  ) {
    this.tooltipBuilder.setViewContainerRef(viewContainerRef);
    this.tooltips = this.tooltipBuilder.getButtonsTooltips();
  }

  openFilter() {
    this.store.dispatch(new OpenFilterForm());
  }

  create() {
    this.store.dispatch(new OpenCreateForm());
  }

  clearFilter() {
    this.store.dispatch(new FilterRequest({ data: null }));
  }
}
