import {
  Component,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { selectHelp, selectKeepHelp } from 'redux/global/global.selectors';
import {
  OpenFilterForm,
  FilterRequest,
} from 'redux/categorias/filter-form/filter-form.actions';
import { OpenCreateForm } from 'redux/categorias/create-form/create-form.actions';

@Component({
  selector: 'app-categorias-buttons',
  templateUrl: './categorias-buttons.component.html',
  styles: [],
})
export class CategoriasButtonsComponent implements OnInit {
  help$: Observable<boolean>;
  keepHelp$: Observable<boolean>;
  tooltips: {
    btnCrear: TemplateRef<TooltipHelpComponent>;
    btnFiltros: TemplateRef<TooltipHelpComponent>;
    btnNoFltros: TemplateRef<TooltipHelpComponent>;
  };

  constructor(
    private store: Store<AppState>,
    public tooltipBuilder: TooltipHelperService,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit() {
    this.help$ = this.store.select(selectHelp);
    this.keepHelp$ = this.store.select(selectKeepHelp);
    this.tooltipBuilder.setViewContainerRef(this.viewContainerRef);
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
