import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTagsComponent } from './table-tags.component';

describe('TableTagsComponent', () => {
  let component: TableTagsComponent;
  let fixture: ComponentFixture<TableTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
