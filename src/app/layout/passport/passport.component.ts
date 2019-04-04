import { Component, OnInit, Inject } from '@angular/core';
import { I18NService } from '@core';
import { ALAIN_I18N_TOKEN } from '@delon/theme';

@Component({
  selector: 'layout-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.less'],
})
export class LayoutPassportComponent implements OnInit {
  links: any[];

  constructor( @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,) {}

  ngOnInit(): void {
    this.links = [
      // {
      //   title: this.i18n.translateString('login.ayuda'),
      //   href: '',
      // },
      // {
      //   title: this.i18n.translateString('login.privacidad'),
      //   href: '',
      // },
      // {
      //   title: this.i18n.translateString('login.terminos'),
      //   href: '',
      // },
    ];
  }
}
