import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosDescripcionesTableComponent } from './gastos-descripciones-table.component';

describe('GastosDescripcionesTableComponent', () => {
  let component: GastosDescripcionesTableComponent;
  let fixture: ComponentFixture<GastosDescripcionesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosDescripcionesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosDescripcionesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
