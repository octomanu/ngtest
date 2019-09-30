import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosButtonsComponent } from './gastos-buttons.component';

describe('GastosButtonsComponent', () => {
  let component: GastosButtonsComponent;
  let fixture: ComponentFixture<GastosButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
