import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosDescripcionesFormComponent } from './gastos-descripciones-form.component';

describe('GastosDescripcionesFormComponent', () => {
  let component: GastosDescripcionesFormComponent;
  let fixture: ComponentFixture<GastosDescripcionesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosDescripcionesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosDescripcionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
