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
  menu = [
    {
      title: `ant design part`,
    },
  ];
  @ViewChild('virtualTable', { static: false })
  nzTableComponent: NzTableComponent;
  private destroy$ = new Subject();

  currentPage = 1;
  data = [];
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
  ngOnInit(): void {
    this.loadData(3);
  }

  loadData(pi: number): void {
    this.data = new Array(36).fill({}).map((_, index) => {
      return {
        href: 'http://ant.design',
        title: `ant design part ${index} (page: ${pi})`,
        avatar:
          'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
          'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      };
    });
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
