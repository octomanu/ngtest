import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequerasTagsComponent } from './chequeras-tags.component';

describe('ChequerasTagsComponent', () => {
  let component: ChequerasTagsComponent;
  let fixture: ComponentFixture<ChequerasTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequerasTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequerasTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
