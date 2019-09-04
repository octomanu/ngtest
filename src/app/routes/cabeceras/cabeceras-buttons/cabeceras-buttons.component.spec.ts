import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecerasButtonsComponent } from './cabeceras-buttons.component';

describe('CabecerasButtonsComponent', () => {
  let component: CabecerasButtonsComponent;
  let fixture: ComponentFixture<CabecerasButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabecerasButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabecerasButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
