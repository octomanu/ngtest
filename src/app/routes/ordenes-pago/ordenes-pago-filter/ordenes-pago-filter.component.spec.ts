import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesPagoFilterComponent } from './ordenes-pago-filter.component';

describe('OrdenesPagoFilterComponent', () => {
  let component: OrdenesPagoFilterComponent;
  let fixture: ComponentFixture<OrdenesPagoFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesPagoFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesPagoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
