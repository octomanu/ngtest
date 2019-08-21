import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteUfTableComponent } from './cuenta-corriente-uf-table.component';

describe('CuentaCorrienteUfTableComponent', () => {
  let component: CuentaCorrienteUfTableComponent;
  let fixture: ComponentFixture<CuentaCorrienteUfTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteUfTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteUfTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
