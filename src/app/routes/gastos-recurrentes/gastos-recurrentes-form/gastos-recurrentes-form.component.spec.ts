import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosRecurrentesFormComponent } from './gastos-recurrentes-form.component';

describe('GastosRecurrentesFormComponent', () => {
  let component: GastosRecurrentesFormComponent;
  let fixture: ComponentFixture<GastosRecurrentesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosRecurrentesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosRecurrentesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
