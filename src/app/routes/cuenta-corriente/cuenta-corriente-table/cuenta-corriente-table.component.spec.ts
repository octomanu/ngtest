import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteTableComponent } from './cuenta-corriente-table.component';

describe('CuentaCorrienteTableComponent', () => {
  let component: CuentaCorrienteTableComponent;
  let fixture: ComponentFixture<CuentaCorrienteTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
