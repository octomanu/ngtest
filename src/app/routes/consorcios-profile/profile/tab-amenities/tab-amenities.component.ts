import { Component, OnInit, Input } from '@angular/core';
import {
  NzMessageService,
  NzDrawerService,
  NzDropdownService,
} from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AmenitiesFormComponent } from './amenities-form/amenities-form.component';
import { AmenitiesService } from '@core/http/amenities/amenities.service';
import { TableLambe } from '@core/lambe/table-lambe.class';

@Component({
  selector: 'app-tab-amenities',
  templateUrl: './tab-amenities.component.html',
  styles: [],
})
export class TabAmenitiesComponent extends TableLambe implements OnInit {
  @Input() idConsorcio: string;
  drawerContent = AmenitiesFormComponent;
  drawerTitle = 'global.amenities';

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
    amenitiesService: AmenitiesService,
  ) {
    super(
      amenitiesService,
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
