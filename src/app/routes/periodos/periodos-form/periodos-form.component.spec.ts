import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodosFormComponent } from './periodos-form.component';

describe('PeriodosFormComponent', () => {
  let component: PeriodosFormComponent;
  let fixture: ComponentFixture<PeriodosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
