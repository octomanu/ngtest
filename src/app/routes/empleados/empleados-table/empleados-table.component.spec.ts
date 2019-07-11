import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosTableComponent } from './empleados-table.component';

describe('EmpleadosTableComponent', () => {
  let component: EmpleadosTableComponent;
  let fixture: ComponentFixture<EmpleadosTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadosTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
