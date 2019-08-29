import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionsTabComponent } from './contributions-tab.component';

describe('ContributionsTabComponent', () => {
  let component: ContributionsTabComponent;
  let fixture: ComponentFixture<ContributionsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributionsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
