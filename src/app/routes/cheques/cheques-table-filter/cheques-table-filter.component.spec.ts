import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequesTableFilterComponent } from './cheques-table-filter.component';

describe('ChequesTableFilterComponent', () => {
  let component: ChequesTableFilterComponent;
  let fixture: ComponentFixture<ChequesTableFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequesTableFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequesTableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
