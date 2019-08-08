import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgresoFormComponent } from './egreso-form.component';

describe('EgresoFormComponent', () => {
  let component: EgresoFormComponent;
  let fixture: ComponentFixture<EgresoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgresoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgresoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
