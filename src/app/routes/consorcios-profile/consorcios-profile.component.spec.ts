import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsorciosProfileComponent } from './consorcios-profile.component';

describe('ConsorciosProfileComponent', () => {
  let component: ConsorciosProfileComponent;
  let fixture: ComponentFixture<ConsorciosProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsorciosProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsorciosProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
