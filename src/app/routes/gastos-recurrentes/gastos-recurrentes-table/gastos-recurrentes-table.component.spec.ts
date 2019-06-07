import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosRecurrentesTableComponent } from './gastos-recurrentes-table.component';

describe('GastosRecurrentesTableComponent', () => {
  let component: GastosRecurrentesTableComponent;
  let fixture: ComponentFixture<GastosRecurrentesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosRecurrentesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosRecurrentesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
