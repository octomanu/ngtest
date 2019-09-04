import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecerasFilterComponent } from './cabeceras-filter.component';

describe('CabecerasFilterComponent', () => {
  let component: CabecerasFilterComponent;
  let fixture: ComponentFixture<CabecerasFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabecerasFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabecerasFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
