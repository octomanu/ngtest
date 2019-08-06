import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosDescripcionesFilterComponent } from './gastos-descripciones-filter.component';

describe('GastosDescripcionesFilterComponent', () => {
  let component: GastosDescripcionesFilterComponent;
  let fixture: ComponentFixture<GastosDescripcionesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosDescripcionesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosDescripcionesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
