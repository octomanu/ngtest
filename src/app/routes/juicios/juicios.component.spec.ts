import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuiciosComponent } from './juicios.component';

describe('JuiciosComponent', () => {
  let component: JuiciosComponent;
  let fixture: ComponentFixture<JuiciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
