import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuiciosFilterComponent } from './juicios-filter.component';

describe('JuiciosFilterComponent', () => {
  let component: JuiciosFilterComponent;
  let fixture: ComponentFixture<JuiciosFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuiciosFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuiciosFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
