import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SueldosButtonsComponent } from './sueldos-buttons.component';

describe('SueldosButtonsComponent', () => {
  let component: SueldosButtonsComponent;
  let fixture: ComponentFixture<SueldosButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SueldosButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SueldosButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
