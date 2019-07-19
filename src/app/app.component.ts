import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  NgZone,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TitleService } from '@delon/theme';
import { VERSION as VERSION_ALAIN } from '@delon/theme';
import {
  VERSION as VERSION_ZORRO,
  NzModalService,
  NzMessageService,
} from 'ng-zorro-antd';

declare var annyang;

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  constructor(
    el: ElementRef,
    renderer: Renderer2,
    public router: Router,
    private titleSrv: TitleService,
    private modalSrv: NzModalService,
    private ngZone: NgZone,
    private msg: NzMessageService,
  ) {
    renderer.setAttribute(
      el.nativeElement,
      'ng-alain-version',
      VERSION_ALAIN.full,
    );
    renderer.setAttribute(
      el.nativeElement,
      'ng-zorro-version',
      VERSION_ZORRO.full,
    );
  }

  ngOnInit() {
    // var commands = {
    //   proveedores: () => {
    //     this.ngZone.run(() => {
    //       this.router.navigate(['/proveedores']);
    //     });
    //   },
    //   inicio: () => {
    //     this.ngZone.run(() => {
    //       this.router.navigate(['/']);
    //     });
    //   },
    //   'saluda a :verb': verb => {
    //     this.ngZone.run(() => {
    //       this.msg.info('Hola ' + verb);
    //     });
    //   },
    // };

    // annyang.addCommands(commands);
    // annyang.setLanguage('es-AR');
    // annyang.debug(true);
    // annyang.start({ autoRestart: true, continuous: false });
    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(() => {
        this.titleSrv.setTitle();
        this.modalSrv.closeAll();
      });
  }
}
