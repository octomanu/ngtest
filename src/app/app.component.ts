import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  NgZone,
  OnDestroy,
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
import { Subscription } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import * as globalActions from 'redux/global/global.actions';

declare var annyang;

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  breakpointRef: Subscription;

  constructor(
    el: ElementRef,
    renderer: Renderer2,
    public router: Router,
    private titleSrv: TitleService,
    private modalSrv: NzModalService,
    private ngZone: NgZone,
    private msg: NzMessageService,
    public breakpointObserver: BreakpointObserver,
    public store: Store<AppState>,
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
    this.subscribeBreakPoint();
    // this.initVoice();

    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(() => {
        this.titleSrv.setTitle();
        this.modalSrv.closeAll();
      });
  }

  ngOnDestroy(): void {
    this.breakpointRef.unsubscribe();
  }

  subscribeBreakPoint() {
    this.breakpointRef = this.breakpointObserver
      .observe(['(min-width: 768px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          const smallScreen = false;
          this.store.dispatch(
            new globalActions.ChangeViewportAction(smallScreen),
          );
        } else {
          const smallScreen = true;
          this.store.dispatch(
            new globalActions.ChangeViewportAction(smallScreen),
          );
        }
      });
  }

  initVoice() {
    var commands = {
      proveedores: () => {
        this.ngZone.run(() => {
          this.router.navigate(['/proveedores']);
        });
      },
      inicio: () => {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
      },
      'saluda a :verb': verb => {
        this.ngZone.run(() => {
          this.msg.info('Hola ' + verb);
        });
      },
    };

    annyang.addCommands(commands);
    annyang.setLanguage('es-AR');
    annyang.debug(true);
    annyang.start({ autoRestart: true, continuous: false });
  }
}
