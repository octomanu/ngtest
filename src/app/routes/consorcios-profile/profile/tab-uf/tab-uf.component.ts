import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UnidadesFuncionalesService } from '@core/http/unidades-funcionales/unidades-funcionales.service';
import { TableLambe } from '@core/lambe/table-lambe.class';
import {
  NzMessageService,
  NzDrawerService,
  NzDropdownService,
} from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UnidadesFuncionalesFormComponent } from './unidades-funcionales-form/unidades-funcionales-form.component';

@Component({
  selector: 'app-tab-uf',
  templateUrl: './tab-uf.component.html',
  styles: [],
})
export class TabUfComponent extends TableLambe implements OnInit, OnDestroy {
  @Input() idConsorcio: string;
  drawerContent = UnidadesFuncionalesFormComponent;
  drawerTitle = 'lambe.porcentuales';

  filtroForm = {
    razon_social: null,
    calle: null,
    numero: null,
    cuit: null,
    estado: null,
  };

  constructor(
    msg: NzMessageService,
    translate: TranslateService,
    drawerService: NzDrawerService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
    unidadesFuncionalesService: UnidadesFuncionalesService,
  ) {
    super(
      unidadesFuncionalesService,
      nzDropdownService,
      breakpointObserver,
      translate,
      drawerService,
      msg,
    );
    this.tags = {
      razon_social: { title: 'global.razon_social', used: false },
      calle: { title: 'global.calle', used: false },
      numero: { title: 'global.direccion', used: false },
      cuit: { title: 'global.cuit', used: false },
      estado: { title: 'global.estado', used: false },
    };
  }

  ngOnInit() {
    this.dataService.setConsorcio(this.idConsorcio);
    super.ngOnInit();
  }

  /**
   * Override
   */
  _openForm(id?: number) {
    this.submitFormSubscription = this.submitForm
      .asObservable()
      .subscribe(value => {
        this.searchData();
      });

    this.translate.get(this.drawerTitle).subscribe((res: string) => {
      this.drawerRef = this.drawerService.create({
        nzTitle: res,
        nzWidth: this.initialDrawerWidth,
        nzContent: this.drawerContent,
        nzContentParams: {
          id,
          valueChange: this.submitForm,
          idConsorcio: this.idConsorcio,
        },
      });

      this.drawerRef.afterClose.subscribe(
        (data: { submit: boolean } | undefined) => {
          this.drawerAfterClose(data);
        },
      );

      this.drawerRef.afterOpen.subscribe(data => {
        this.drawerAfterOpen(data);
      });
    });
  }
}
