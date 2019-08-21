import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteUfComponent } from './cuenta-corriente-uf.component';

describe('CuentaCorrienteUfComponent', () => {
  let component: CuentaCorrienteUfComponent;
  let fixture: ComponentFixture<CuentaCorrienteUfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteUfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteUfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
