import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteProveedorButtonsComponent } from './cuenta-corriente-proveedor-buttons.component';

describe('CuentaCorrienteProveedorButtonsComponent', () => {
  let component: CuentaCorrienteProveedorButtonsComponent;
  let fixture: ComponentFixture<CuentaCorrienteProveedorButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteProveedorButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteProveedorButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
