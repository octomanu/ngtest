import {
  Component,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ButtonsComponent } from 'app/routes/classes/ButtonsComponent.class';
import { CuentaCorrienteConsorcioFilterComponent } from '../cuenta-corriente-consorcio-filter/cuenta-corriente-consorcio-filter.component';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { CuentaCorrienteConsorcioState } from 'redux/cuenta-corriente-consorcio/cuenta-corriente-consorcio.reducer';
import {
  ChangeConsorcioAction,
  ChangeFilterAction,
} from 'redux/cuenta-corriente-consorcio/cuenta-corriente-consorcio.actions';

@Component({
  selector: 'app-cuenta-corriente-consorcio-buttons',
  templateUrl: './cuenta-corriente-consorcio-buttons.component.html',
  styles: [],
})
export class CuentaCorrienteConsorcioButtonsComponent extends ButtonsComponent
  implements OnInit {
  public idConsorcio;
  drawerTitle = 'global.cuenta_corriente_consorcio';
  drawerContent = CuentaCorrienteConsorcioFilterComponent;
  consorcios: { id: number; display: string }[];
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
    protected consorciosService: ConsorciosService,
    translate: TranslateService,
    drawerService: NzDrawerService,
    viewContainerRef: ViewContainerRef,
  ) {
    super(translate, drawerService);
    this.tooltipBuilder.setViewContainerRef(viewContainerRef);
    this.tooltips = this.tooltipBuilder.getButtonsTooltips();
  }

  ngOnInit(): void {
    this.searchConsorcioList('');
    this.store
      .select('cuentaCorrienteConsorcio')
      .subscribe((state: CuentaCorrienteConsorcioState) => {
        this.idConsorcio = state.id_consorcio;
      });
  }

  changeProveedor() {
    this.store.dispatch(new ChangeConsorcioAction(this.idConsorcio));
  }

  searchConsorcios(display: string) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.isLoading = true;
      this.searchConsorcioList(display);
    }, 400);
  }

  protected searchConsorcioList(display: string) {
    this.consorciosService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.consorcios = data;
      });
  }

  clearFilter() {
    this.store.dispatch(
      new ChangeFilterAction({ descripcion: null, fecha: null, monto: null }),
    );
  }
}
