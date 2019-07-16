import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenitiesFormComponent } from './amenities-form.component';

describe('AmenitiesFormComponent', () => {
  let component: AmenitiesFormComponent;
  let fixture: ComponentFixture<AmenitiesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmenitiesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmenitiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
