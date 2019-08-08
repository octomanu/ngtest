import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoFormComponent } from './ingreso-form.component';

describe('IngresoFormComponent', () => {
  let component: IngresoFormComponent;
  let fixture: ComponentFixture<IngresoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
