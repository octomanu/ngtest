import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesPagoButtonsComponent } from './ordenes-pago-buttons.component';

describe('OrdenesPagoButtonsComponent', () => {
  let component: OrdenesPagoButtonsComponent;
  let fixture: ComponentFixture<OrdenesPagoButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesPagoButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesPagoButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
