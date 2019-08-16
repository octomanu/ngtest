import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequesTercerosFormComponent } from './cheques-terceros-form.component';

describe('ChequesTercerosFormComponent', () => {
  let component: ChequesTercerosFormComponent;
  let fixture: ComponentFixture<ChequesTercerosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequesTercerosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequesTercerosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
