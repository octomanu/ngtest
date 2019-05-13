import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosTableFilterComponent } from './gastos-table-filter.component';

describe('GastosTableFilterComponent', () => {
  let component: GastosTableFilterComponent;
  let fixture: ComponentFixture<GastosTableFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosTableFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosTableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
