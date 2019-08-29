import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInformationTabComponent } from './basic-information-tab.component';

describe('BasicInformationTabComponent', () => {
  let component: BasicInformationTabComponent;
  let fixture: ComponentFixture<BasicInformationTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicInformationTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInformationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
