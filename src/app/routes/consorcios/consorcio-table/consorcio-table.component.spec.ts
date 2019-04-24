import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsorcioTableComponent } from './consorcio-table.component';

describe('ConsorcioTableComponent', () => {
  let component: ConsorcioTableComponent;
  let fixture: ComponentFixture<ConsorcioTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsorcioTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsorcioTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
