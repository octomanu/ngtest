import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteConsorcioButtonsComponent } from './cuenta-corriente-consorcio-buttons.component';

describe('CuentaCorrienteConsorcioButtonsComponent', () => {
  let component: CuentaCorrienteConsorcioButtonsComponent;
  let fixture: ComponentFixture<CuentaCorrienteConsorcioButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteConsorcioButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteConsorcioButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
