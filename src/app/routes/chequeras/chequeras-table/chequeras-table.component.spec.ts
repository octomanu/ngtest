import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequerasTableComponent } from './chequeras-table.component';

describe('ChequerasTableComponent', () => {
  let component: ChequerasTableComponent;
  let fixture: ComponentFixture<ChequerasTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequerasTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequerasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
