import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAmenitiesComponent } from './tab-amenities.component';

describe('TabAmenitiesComponent', () => {
  let component: TabAmenitiesComponent;
  let fixture: ComponentFixture<TabAmenitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAmenitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAmenitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
