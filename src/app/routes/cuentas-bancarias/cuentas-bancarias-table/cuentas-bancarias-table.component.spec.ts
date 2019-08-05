import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasBancariasTableComponent } from './cuentas-bancarias-table.component';

describe('CuentasBancariasTableComponent', () => {
  let component: CuentasBancariasTableComponent;
  let fixture: ComponentFixture<CuentasBancariasTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentasBancariasTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasBancariasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
