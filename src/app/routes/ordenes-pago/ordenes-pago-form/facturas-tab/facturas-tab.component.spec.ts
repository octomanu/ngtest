import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasTabComponent } from './facturas-tab.component';

describe('FacturasTabComponent', () => {
  let component: FacturasTabComponent;
  let fixture: ComponentFixture<FacturasTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
