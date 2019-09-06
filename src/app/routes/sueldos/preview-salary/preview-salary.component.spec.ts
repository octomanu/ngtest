import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSalaryComponent } from './preview-salary.component';

describe('PreviewSalaryComponent', () => {
  let component: PreviewSalaryComponent;
  let fixture: ComponentFixture<PreviewSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewSalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
