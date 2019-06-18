import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoFinancieroTableComponent } from './estado-financiero-table.component';

describe('EstadoFinancieroTableComponent', () => {
  let component: EstadoFinancieroTableComponent;
  let fixture: ComponentFixture<EstadoFinancieroTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoFinancieroTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoFinancieroTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
