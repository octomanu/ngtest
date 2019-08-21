import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteUfFilterComponent } from './cuenta-corriente-uf-filter.component';

describe('CuentaCorrienteUfFilterComponent', () => {
  let component: CuentaCorrienteUfFilterComponent;
  let fixture: ComponentFixture<CuentaCorrienteUfFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteUfFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteUfFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
