import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecerasFormComponent } from './cabeceras-form.component';

describe('CabecerasFormComponent', () => {
  let component: CabecerasFormComponent;
  let fixture: ComponentFixture<CabecerasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabecerasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabecerasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
