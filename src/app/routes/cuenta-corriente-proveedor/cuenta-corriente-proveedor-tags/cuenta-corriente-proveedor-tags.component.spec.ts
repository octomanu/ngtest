import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteProveedorTagsComponent } from './cuenta-corriente-proveedor-tags.component';

describe('CuentaCorrienteProveedorTagsComponent', () => {
  let component: CuentaCorrienteProveedorTagsComponent;
  let fixture: ComponentFixture<CuentaCorrienteProveedorTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteProveedorTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteProveedorTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
