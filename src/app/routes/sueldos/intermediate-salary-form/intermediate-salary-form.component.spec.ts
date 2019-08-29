import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntermediateSalaryFormComponent } from './intermediate-salary-form.component';

describe('IntermediateSalaryFormComponent', () => {
  let component: IntermediateSalaryFormComponent;
  let fixture: ComponentFixture<IntermediateSalaryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntermediateSalaryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntermediateSalaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
