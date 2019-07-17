// tslint:disable:no-any
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { MenuHandlerService } from 'app/utils/menu-handler/menu-handler.service';
import { Subject } from 'rxjs';
import { NzTableComponent } from 'ng-zorro-antd';
import { takeUntil } from 'rxjs/operators';

export interface VirtualDataInterface {
  index: number;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'header-icon',
  templateUrl: './header-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderIconComponent {
  loading = true;
  menuSubscription;
  menu = [];
  @ViewChild('virtualTable', { static: false })
  nzTableComponent: NzTableComponent;
  private destroy$ = new Subject();
  listOfData: VirtualDataInterface[] = [];
  constructor(
    private cdr: ChangeDetectorRef,
    protected menuHandler: MenuHandlerService,
  ) {
    this.menuSubscription = this.menuHandler.getMenu().subscribe(menu => {
      this.menu = menu;
      this.cdr.detectChanges();
    });
  }

  scrollToIndex(index: number): void {
    this.nzTableComponent.cdkVirtualScrollViewport.scrollToIndex(index);
  }

  trackByIndex(_: number, data: VirtualDataInterface): number {
    return data.index;
  }

  // ngOnInit(): void {
  //   const data = [];
  //   for (let i = 0; i < 20000; i++) {
  //     data.push({
  //       index: i,
  //       name: `Edward King`,
  //       age: 32,
  //       address: `London`,
  //     });
  //   }
  //   this.listOfData = data;
  // }

  // ngAfterViewInit(): void {
  //   this.nzTableComponent.cdkVirtualScrollViewport.scrolledIndexChange
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((data: number) => {
  //       console.log('scroll index to', data);
  //     });
  // }

  // ngOnDestroy(): void {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }
  change() {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    }, 500);
  }
}
