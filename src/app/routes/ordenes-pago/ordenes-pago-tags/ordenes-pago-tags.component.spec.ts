import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesPagoTagsComponent } from './ordenes-pago-tags.component';

describe('OrdenesPagoTagsComponent', () => {
  let component: OrdenesPagoTagsComponent;
  let fixture: ComponentFixture<OrdenesPagoTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesPagoTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesPagoTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
