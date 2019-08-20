import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteConsorcioComponent } from './cuenta-corriente-consorcio.component';

describe('CuentaCorrienteConsorcioComponent', () => {
  let component: CuentaCorrienteConsorcioComponent;
  let fixture: ComponentFixture<CuentaCorrienteConsorcioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteConsorcioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteConsorcioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
