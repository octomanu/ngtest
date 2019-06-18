import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteFormComponent } from './cuenta-corriente-form.component';

describe('CuentaCorrienteFormComponent', () => {
  let component: CuentaCorrienteFormComponent;
  let fixture: ComponentFixture<CuentaCorrienteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
