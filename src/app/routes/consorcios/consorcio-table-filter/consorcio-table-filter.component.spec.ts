import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsorcioTableFilterComponent } from './consorcio-table-filter.component';

describe('ConsorcioTableFilterComponent', () => {
  let component: ConsorcioTableFilterComponent;
  let fixture: ComponentFixture<ConsorcioTableFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsorcioTableFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsorcioTableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
