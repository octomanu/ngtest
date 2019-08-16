import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesPagoFormComponent } from './ordenes-pago-form.component';

describe('OrdenesPagoFormComponent', () => {
  let component: OrdenesPagoFormComponent;
  let fixture: ComponentFixture<OrdenesPagoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesPagoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesPagoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
