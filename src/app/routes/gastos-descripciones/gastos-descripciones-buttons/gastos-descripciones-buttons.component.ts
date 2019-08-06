import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { ButtonsComponent } from 'app/routes/classes/ButtonsComponent.class';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { ChangeFilterAction } from 'redux/gastos-descripciones/gastos-descripciones.actions';
import { GastosDescripcionesFilterComponent } from '../gastos-descripciones-filter/gastos-descripciones-filter.component';

@Component({
  selector: 'app-gastos-descripciones-buttons',
  templateUrl: './gastos-descripciones-buttons.component.html',
  styles: [],
})
export class GastosDescripcionesButtonsComponent extends ButtonsComponent {
  drawerTitle = 'global.gastos_descripciones';
  drawerContent = GastosDescripcionesFilterComponent;
  tooltips: {
    btnCrear: TemplateRef<TooltipHelpComponent>;
    btnFiltros: TemplateRef<TooltipHelpComponent>;
    btnNoFltros: TemplateRef<TooltipHelpComponent>;
  };
  constructor(
    public store: Store<AppState>,
    public tooltipBuilder: TooltipHelperService,
    translate: TranslateService,
    drawerService: NzDrawerService,
    viewContainerRef: ViewContainerRef,
  ) {
    super(translate, drawerService);
    this.tooltipBuilder.setViewContainerRef(viewContainerRef);
    this.tooltips = this.tooltipBuilder.getButtonsTooltips();
  }

  clearFilter() {
    this.store.dispatch(new ChangeFilterAction({ titulo: null }));
  }
}
