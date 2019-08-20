import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteProveedorFormComponent } from './cuenta-corriente-proveedor-form.component';

describe('CuentaCorrienteProveedorFormComponent', () => {
  let component: CuentaCorrienteProveedorFormComponent;
  let fixture: ComponentFixture<CuentaCorrienteProveedorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteProveedorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteProveedorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
