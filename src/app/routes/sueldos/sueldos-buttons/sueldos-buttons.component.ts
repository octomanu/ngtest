import {
  Component,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';
import { ButtonsComponent } from 'app/routes/classes/ButtonsComponent.class';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import { EmpleadosFinderService } from 'app/routes/services/type-ahead/empleados-finder/empleados-finder.service';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { selectIdEmpleado } from 'redux/sueldos/sueldos.selectors';
import {
  ChangeEmpleadoAction,
  ChangeFilterAction,
} from 'redux/sueldos/sueldos.actions';
import { SalaryFormComponent } from '../salary-form/salary-form.component';
import { IntermediateSalaryFormComponent } from '../intermediate-salary-form/intermediate-salary-form.component';
import { VacationFormComponent } from '../vacation-form/vacation-form.component';

@Component({
  selector: 'app-sueldos-buttons',
  templateUrl: './sueldos-buttons.component.html',
  styles: [],
  providers: [EmpleadosFinderService],
})
export class SueldosButtonsComponent extends ButtonsComponent
  implements OnInit, OnDestroy {
  public idEmpleado;
  drawerTitle = 'global.sueldos';
  drawerContent = 'jeje';
  proveedores: { id: number; display: string }[];
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
    public empleadosFinder: EmpleadosFinderService,
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
      .select(selectIdEmpleado)
      .subscribe(idEmpleado => (this.idEmpleado = idEmpleado));
  }

  salarySettlement() {
    this.translate.get('global.sueldo').subscribe((res: string) => {
      this.drawerService.create({
        nzTitle: res,
        nzWidth: this.smallViewport ? '100%' : '75%',
        nzContent: SalaryFormComponent,
        nzPlacement: 'right',
        nzContentParams: { idEmpleado: this.idEmpleado },
      });
    });
  }

  intermediateSalarySettlement() {
    this.translate.get('global.sueldo_intermedio').subscribe((res: string) => {
      this.drawerService.create({
        nzTitle: res,
        nzWidth: this.smallViewport ? '100%' : '75%',
        nzContent: IntermediateSalaryFormComponent,
        nzPlacement: 'right',
        nzContentParams: { idEmpleado: this.idEmpleado },
      });
    });
  }

  vacationSettlement() {
    this.translate.get('global.vacaciones').subscribe((res: string) => {
      this.drawerService.create({
        nzTitle: res,
        nzWidth: this.smallViewport ? '100%' : '75%',
        nzContent: VacationFormComponent,
        nzPlacement: 'right',
        nzContentParams: { idEmpleado: this.idEmpleado },
      });
    });
  }

  ngOnDestroy() {
    this.storeSubscripcion.unsubscribe();
  }

  changeEmpleado() {
    this.store.dispatch(new ChangeEmpleadoAction(this.idEmpleado));
  }

  searchEmpleados(display: string) {
    this.empleadosFinder.search(display);
  }

  clearFilter() {
    this.store.dispatch(
      new ChangeFilterAction({ descripcion: null, fecha: null, monto: null }),
    );
  }
}
