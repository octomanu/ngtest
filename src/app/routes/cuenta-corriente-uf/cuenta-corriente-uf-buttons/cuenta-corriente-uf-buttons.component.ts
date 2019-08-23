import {
  Component,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ButtonsComponent } from 'app/routes/classes/ButtonsComponent.class';
import { CuentaCorrienteUfFilterComponent } from '../cuenta-corriente-uf-filter/cuenta-corriente-uf-filter.component';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { CuentaCorrienteUfState } from 'redux/cuenta-corriente-uf/cuenta-corriente-uf-reducer';
import {
  ChangeConsorcioAction,
  ChangeUfAction,
  ChangeFilterAction,
} from 'redux/cuenta-corriente-uf/cuenta-corriente-uf-actions';
import { UnidadesFuncionalesService } from '@core/http/unidades-funcionales/unidades-funcionales.service';
import { CobroFormComponent } from '../cobro-form/cobro-form.component';
import { DeudaFormComponent } from '../deuda-form/deuda-form.component';

@Component({
  selector: 'app-cuenta-corriente-uf-buttons',
  templateUrl: './cuenta-corriente-uf-buttons.component.html',
  styles: [],
})
export class CuentaCorrienteUfButtonsComponent extends ButtonsComponent
  implements OnInit {
  public idConsorcio;
  public idUf;
  drawerTitle = 'global.cuenta_corriente_uf';
  drawerContent = CuentaCorrienteUfFilterComponent;
  consorcios: { id: number; display: string }[];
  ufs: { id: number; display: string }[];
  isLoading = false;
  protected timeout = null;

  tooltips: {
    btnCrear: TemplateRef<TooltipHelpComponent>;
    btnFiltros: TemplateRef<TooltipHelpComponent>;
    btnNoFltros: TemplateRef<TooltipHelpComponent>;
  };

  constructor(
    protected store: Store<AppState>,
    protected tooltipBuilder: TooltipHelperService,
    protected consorciosService: ConsorciosService,
    protected ufsService: UnidadesFuncionalesService,
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
      .select('cuentaCorrienteUf')
      .subscribe((state: CuentaCorrienteUfState) => {
        this.idConsorcio = state.id_consorcio;
        this.idUf = state.id_uf;
        if (state.id_uf) this.searchUfsList('');
      });
  }

  cobro() {
    this.translate.get('global.cobro').subscribe((res: string) => {
      this.drawerService.create({
        nzTitle: res,
        nzWidth: this.smallViewport ? '100%' : '75%',
        nzContent: CobroFormComponent,
        nzPlacement: 'right',
      });
    });
  }
  deuda() {
    this.translate.get('global.deuda').subscribe((res: string) => {
      this.drawerService.create({
        nzTitle: res,
        nzWidth: this.smallViewport ? '100%' : '75%',
        nzContent: DeudaFormComponent,
        nzPlacement: 'right',
      });
    });
  }

  changeConsorcio() {
    this.store.dispatch(new ChangeConsorcioAction(this.idConsorcio));
    this.ufsService.setConsorcio(this.idConsorcio);
    this.searchUfsList('');
  }
  changeUf() {
    this.store.dispatch(new ChangeUfAction(this.idUf));
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

  searchUfs(display: string) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.isLoading = true;
      this.searchUfsList(display);
    }, 400);
  }

  protected searchUfsList(display: string) {
    this.ufsService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.ufs = data;
      });
  }

  clearFilter() {
    this.store.dispatch(
      new ChangeFilterAction({ descripcion: null, fecha: null, monto: null }),
    );
  }
}
