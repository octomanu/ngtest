import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensaPreviewComponent } from './expensa-preview.component';

describe('ExpensaPreviewComponent', () => {
  let component: ExpensaPreviewComponent;
  let fixture: ComponentFixture<ExpensaPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensaPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensaPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
