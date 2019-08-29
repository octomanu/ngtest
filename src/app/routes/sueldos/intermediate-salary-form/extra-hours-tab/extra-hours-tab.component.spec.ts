import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraHoursTabComponent } from './extra-hours-tab.component';

describe('ExtraHoursTabComponent', () => {
  let component: ExtraHoursTabComponent;
  let fixture: ComponentFixture<ExtraHoursTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraHoursTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraHoursTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
