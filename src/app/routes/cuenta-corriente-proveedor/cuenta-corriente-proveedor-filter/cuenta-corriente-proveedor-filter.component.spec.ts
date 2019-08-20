import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteProveedorFilterComponent } from './cuenta-corriente-proveedor-filter.component';

describe('CuentaCorrienteProveedorFilterComponent', () => {
  let component: CuentaCorrienteProveedorFilterComponent;
  let fixture: ComponentFixture<CuentaCorrienteProveedorFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteProveedorFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteProveedorFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
