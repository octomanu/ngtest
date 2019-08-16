import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesPagoTableComponent } from './ordenes-pago-table.component';

describe('OrdenesPagoTableComponent', () => {
  let component: OrdenesPagoTableComponent;
  let fixture: ComponentFixture<OrdenesPagoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesPagoTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesPagoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
