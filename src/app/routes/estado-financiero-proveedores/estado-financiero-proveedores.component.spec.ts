import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoFinancieroProveedoresComponent } from './estado-financiero-proveedores.component';

describe('EstadoFinancieroProveedoresComponent', () => {
  let component: EstadoFinancieroProveedoresComponent;
  let fixture: ComponentFixture<EstadoFinancieroProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoFinancieroProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoFinancieroProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
