import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosDescripcionesButtonsComponent } from './gastos-descripciones-buttons.component';

describe('GastosDescripcionesButtonsComponent', () => {
  let component: GastosDescripcionesButtonsComponent;
  let fixture: ComponentFixture<GastosDescripcionesButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosDescripcionesButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosDescripcionesButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
