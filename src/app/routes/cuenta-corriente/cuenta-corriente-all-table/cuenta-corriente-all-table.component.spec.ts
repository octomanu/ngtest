import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteAllTableComponent } from './cuenta-corriente-all-table.component';

describe('CuentaCorrienteTableComponent', () => {
  let component: CuentaCorrienteAllTableComponent;
  let fixture: ComponentFixture<CuentaCorrienteAllTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteAllTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteAllTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
