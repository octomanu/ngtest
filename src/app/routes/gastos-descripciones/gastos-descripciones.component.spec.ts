import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosDescripcionesComponent } from './gastos-descripciones.component';

describe('GastosDescripcionesComponent', () => {
  let component: GastosDescripcionesComponent;
  let fixture: ComponentFixture<GastosDescripcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosDescripcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosDescripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
