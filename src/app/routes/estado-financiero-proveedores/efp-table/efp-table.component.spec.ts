import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfpTableComponent } from './efp-table.component';

describe('EfpTableComponent', () => {
  let component: EfpTableComponent;
  let fixture: ComponentFixture<EfpTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfpTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
