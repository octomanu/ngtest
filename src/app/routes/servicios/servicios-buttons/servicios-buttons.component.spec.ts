import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosButtonsComponent } from './servicios-buttons.component';

describe('ServiciosButtonsComponent', () => {
  let component: ServiciosButtonsComponent;
  let fixture: ComponentFixture<ServiciosButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
