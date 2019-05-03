import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequerasTableFilterComponent } from './chequeras-table-filter.component';

describe('ChequerasTableFilterComponent', () => {
  let component: ChequerasTableFilterComponent;
  let fixture: ComponentFixture<ChequerasTableFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequerasTableFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequerasTableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
