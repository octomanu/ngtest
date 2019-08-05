import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasBancariasButtonsComponent } from './cuentas-bancarias-buttons.component';

describe('CuentasBancariasButtonsComponent', () => {
  let component: CuentasBancariasButtonsComponent;
  let fixture: ComponentFixture<CuentasBancariasButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentasBancariasButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasBancariasButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
