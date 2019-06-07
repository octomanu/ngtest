import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecerasTableComponent } from './cabeceras-table.component';

describe('CabecerasTableComponent', () => {
  let component: CabecerasTableComponent;
  let fixture: ComponentFixture<CabecerasTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabecerasTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabecerasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
