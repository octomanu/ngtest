import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosFilterComponent } from './servicios-filter.component';

describe('ServiciosFilterComponent', () => {
  let component: ServiciosFilterComponent;
  let fixture: ComponentFixture<ServiciosFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
