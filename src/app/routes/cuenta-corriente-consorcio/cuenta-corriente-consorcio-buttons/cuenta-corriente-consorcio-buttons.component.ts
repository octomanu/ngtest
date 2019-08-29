import {
  Component,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';
import { ButtonsComponent } from 'app/routes/classes/ButtonsComponent.class';
import { CuentaCorrienteConsorcioFilterComponent } from '../cuenta-corriente-consorcio-filter/cuenta-corriente-consorcio-filter.component';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerService } from 'ng-zorro-antd';
import {
  ChangeConsorcioAction,
  ChangeFilterAction,
} from 'redux/cuenta-corriente-consorcio/cuenta-corriente-consorcio.actions';
import { selectIdConsorcio } from 'redux/cuenta-corriente-consorcio/cuenta-corriente-consorcio.selectors';
import { Subscription } from 'rxjs';
import { ConsorciosFinderService } from 'app/routes/services/type-ahead/consorcios-finder/consorcios-finder.service';

@Component({
  selector: 'app-cuenta-corriente-consorcio-buttons',
  templateUrl: './cuenta-corriente-consorcio-buttons.component.html',
  styles: [],
  providers: [ConsorciosFinderService],
})
export class CuentaCorrienteConsorcioButtonsComponent extends ButtonsComponent
  implements OnInit, OnDestroy {
  idConsorcio;
  drawerTitle = 'global.cuenta_corriente_consorcio';
  drawerContent = CuentaCorrienteConsorcioFilterComponent;
  protected timeout = null;
  protected isLoading = false;
  tooltips: {
    btnCrear: TemplateRef<TooltipHelpComponent>;
    btnFiltros: TemplateRef<TooltipHelpComponent>;
    btnNoFltros: TemplateRef<TooltipHelpComponent>;
  };

  constructor(
    protected store: Store<AppState>,
    protected tooltipBuilder: TooltipHelperService,
    public consorciosFinder: ConsorciosFinderService,
    translate: TranslateService,
    drawerService: NzDrawerService,
    viewContainerRef: ViewContainerRef,
  ) {
    super(translate, drawerService);
    this.tooltipBuilder.setViewContainerRef(viewContainerRef);
    this.tooltips = this.tooltipBuilder.getButtonsTooltips();
  }

  ngOnInit() {
    this.storeSubscripcion = this.store
      .select(selectIdConsorcio)
      .subscribe(idConsorcio => (this.idConsorcio = idConsorcio));
  }

  ngOnDestroy() {
    this.storeSubscripcion.unsubscribe();
  }

  changeProveedor() {
    this.store.dispatch(new ChangeConsorcioAction(this.idConsorcio));
  }

  searchConsorcios(display: string) {
    this.consorciosFinder.searchConsorcios(display);
  }

  clearFilter() {
    this.store.dispatch(
      new ChangeFilterAction({ descripcion: null, fecha: null, monto: null }),
    );
  }
}
