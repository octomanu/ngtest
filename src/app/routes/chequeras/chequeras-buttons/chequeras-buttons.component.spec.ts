import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequerasButtonsComponent } from './chequeras-buttons.component';

describe('ChequerasButtonsComponent', () => {
  let component: ChequerasButtonsComponent;
  let fixture: ComponentFixture<ChequerasButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequerasButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequerasButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
