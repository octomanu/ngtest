import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsorciosComponent } from './consorcios.component';

describe('ConsorciosComponent', () => {
  let component: ConsorciosComponent;
  let fixture: ComponentFixture<ConsorciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsorciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsorciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
