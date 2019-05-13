import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosTableComponent } from './gastos-table.component';

describe('GastosTableComponent', () => {
  let component: GastosTableComponent;
  let fixture: ComponentFixture<GastosTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
