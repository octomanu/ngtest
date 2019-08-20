import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteConsorcioTableComponent } from './cuenta-corriente-consorcio-table.component';

describe('CuentaCorrienteConsorcioTableComponent', () => {
  let component: CuentaCorrienteConsorcioTableComponent;
  let fixture: ComponentFixture<CuentaCorrienteConsorcioTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteConsorcioTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteConsorcioTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
