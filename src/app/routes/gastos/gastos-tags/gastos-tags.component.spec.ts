import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosTagsComponent } from './gastos-tags.component';

describe('GastosTagsComponent', () => {
  let component: GastosTagsComponent;
  let fixture: ComponentFixture<GastosTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
