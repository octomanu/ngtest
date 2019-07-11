import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodosTableComponent } from './periodos-table.component';

describe('PeriodosTableComponent', () => {
  let component: PeriodosTableComponent;
  let fixture: ComponentFixture<PeriodosTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodosTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
