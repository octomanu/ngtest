import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuiciosFormComponent } from './juicios-form.component';

describe('JuiciosFormComponent', () => {
  let component: JuiciosFormComponent;
  let fixture: ComponentFixture<JuiciosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuiciosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuiciosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
