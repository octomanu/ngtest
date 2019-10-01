import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuiciosButtonsComponent } from './juicios-buttons.component';

describe('JuiciosButtonsComponent', () => {
  let component: JuiciosButtonsComponent;
  let fixture: ComponentFixture<JuiciosButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuiciosButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuiciosButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
