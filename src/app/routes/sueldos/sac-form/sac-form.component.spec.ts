import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SacFormComponent } from './sac-form.component';

describe('SacFormComponent', () => {
  let component: SacFormComponent;
  let fixture: ComponentFixture<SacFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SacFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SacFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
