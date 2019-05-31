import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPorcentualesComponent } from './tab-porcentuales.component';

describe('TabPorcentualesComponent', () => {
  let component: TabPorcentualesComponent;
  let fixture: ComponentFixture<TabPorcentualesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabPorcentualesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPorcentualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
