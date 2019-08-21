import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteUfButtonsComponent } from './cuenta-corriente-uf-buttons.component';

describe('CuentaCorrienteUfButtonsComponent', () => {
  let component: CuentaCorrienteUfButtonsComponent;
  let fixture: ComponentFixture<CuentaCorrienteUfButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteUfButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteUfButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
