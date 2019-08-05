import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasBancariasFormComponent } from './cuentas-bancarias-form.component';

describe('CuentasBancariasFormComponent', () => {
  let component: CuentasBancariasFormComponent;
  let fixture: ComponentFixture<CuentasBancariasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentasBancariasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasBancariasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
