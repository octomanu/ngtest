import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuiciosTableComponent } from './juicios-table.component';

describe('JuiciosTableComponent', () => {
  let component: JuiciosTableComponent;
  let fixture: ComponentFixture<JuiciosTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuiciosTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuiciosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
