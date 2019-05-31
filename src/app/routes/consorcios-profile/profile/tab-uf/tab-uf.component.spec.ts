import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabUfComponent } from './tab-uf.component';

describe('TabUfComponent', () => {
  let component: TabUfComponent;
  let fixture: ComponentFixture<TabUfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabUfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabUfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
