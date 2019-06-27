import { TestBed } from '@angular/core/testing';

import { TableLambe } from './table-lambe.class';
import { NzDropdownService } from 'ng-zorro-antd';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';
import { OverlayModule } from '@angular/cdk/overlay';
export class FakeDataService {
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0 });
  }
}

export class FakeTableLambeClass extends TableLambe {
  constructor(
    dataService: any,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(dataService, nzDropdownService, breakpointObserver);
  }
  getTableLambe() {
    return this.tableLambe;
  }
}

describe('TableLambe', () => {
  let service: FakeTableLambeClass;
  let dataService: FakeDataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OverlayModule],
    });
    dataService = new FakeDataService();
    service = new FakeTableLambeClass(
      dataService,
      TestBed.get(NzDropdownService),
      TestBed.get(BreakpointObserver),
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debe buscar los datos al backend', () => {
    const spy = spyOn(dataService, 'paginate').and.returnValue(
      of({ ok: true, data: [{ id: 1, nombre: 'asd' }], recordsFiltered: 1 }),
    );
    service.searchData();
    expect(spy).toHaveBeenCalled();
    expect(service.getTableLambe().total).toBe(1);
    expect(service.getTableLambe().data.length).toBe(1);
    expect(service.getTableLambe().loading).toBeFalsy();
    expect(service.getTableLambe().data[0].id).toBe(1);
    expect(service.getTableLambe().data[0].nombre).toBe('asd');
  });
});
