import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { UnidadesFuncionalesService } from '@core/http/unidades-funcionales/unidades-funcionales.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-consorcios-profile',
  templateUrl: './consorcios-profile.component.html',
  styles: [],
})
export class ConsorciosProfileComponent implements OnInit, OnDestroy {
  position: string;
  idConsorcio: string;
  breakpointRef: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idConsorcio = params.get('id');
    });

    this.breakpointRef = this.breakpointObserver
      .observe(['(min-width: 1200px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          // mayor a LG
          this.position = 'right';
        } else {
          // menor a LG
          this.position = 'top';
        }
      });
  }

  ngOnDestroy(): void {
    this.breakpointRef.unsubscribe();
  }
}
