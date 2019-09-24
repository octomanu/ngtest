import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorcentualesComponent } from './porcentuales.component';

describe('PorcentualesComponent', () => {
  let component: PorcentualesComponent;
  let fixture: ComponentFixture<PorcentualesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorcentualesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorcentualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
