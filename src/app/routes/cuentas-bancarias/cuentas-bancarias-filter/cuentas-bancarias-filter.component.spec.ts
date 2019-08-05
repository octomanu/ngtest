import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasBancariasFilterComponent } from './cuentas-bancarias-filter.component';

describe('CuentasBancariasFilterComponent', () => {
  let component: CuentasBancariasFilterComponent;
  let fixture: ComponentFixture<CuentasBancariasFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentasBancariasFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasBancariasFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
