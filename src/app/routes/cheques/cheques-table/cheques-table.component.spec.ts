import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequesTableComponent } from './cheques-table.component';

describe('ChequesTableComponent', () => {
  let component: ChequesTableComponent;
  let fixture: ComponentFixture<ChequesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
