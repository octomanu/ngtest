import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteProveedorTableComponent } from './cuenta-corriente-proveedor-table.component';

describe('CuentaCorrienteProveedorTableComponent', () => {
  let component: CuentaCorrienteProveedorTableComponent;
  let fixture: ComponentFixture<CuentaCorrienteProveedorTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteProveedorTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteProveedorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
