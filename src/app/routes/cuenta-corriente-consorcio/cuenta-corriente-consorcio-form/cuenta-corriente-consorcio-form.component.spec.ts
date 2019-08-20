import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteConsorcioFormComponent } from './cuenta-corriente-consorcio-form.component';

describe('CuentaCorrienteConsorcioFormComponent', () => {
  let component: CuentaCorrienteConsorcioFormComponent;
  let fixture: ComponentFixture<CuentaCorrienteConsorcioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteConsorcioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteConsorcioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
