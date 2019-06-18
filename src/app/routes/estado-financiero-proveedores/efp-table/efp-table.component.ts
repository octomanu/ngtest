import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableLambe } from '@core/lambe/table-lambe.class';

@Component({
  selector: 'app-efp-table',
  templateUrl: './efp-table.component.html',
  styles: [],
})
export class EfpTableComponent extends TableLambe implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.unsubscribeBreakPoint();
  }
}
