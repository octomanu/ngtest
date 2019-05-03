import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequerasFormComponent } from './chequeras-form.component';

describe('ChequerasFormComponent', () => {
  let component: ChequerasFormComponent;
  let fixture: ComponentFixture<ChequerasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequerasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequerasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
