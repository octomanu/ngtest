import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteConsorcioFilterComponent } from './cuenta-corriente-consorcio-filter.component';

describe('CuentaCorrienteConsorcioFilterComponent', () => {
  let component: CuentaCorrienteConsorcioFilterComponent;
  let fixture: ComponentFixture<CuentaCorrienteConsorcioFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteConsorcioFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteConsorcioFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
