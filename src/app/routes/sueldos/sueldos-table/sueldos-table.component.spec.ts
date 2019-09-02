import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SueldosTableComponent } from './sueldos-table.component';

describe('SueldosTableComponent', () => {
  let component: SueldosTableComponent;
  let fixture: ComponentFixture<SueldosTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SueldosTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SueldosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
