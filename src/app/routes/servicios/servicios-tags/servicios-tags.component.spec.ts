import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosTagsComponent } from './servicios-tags.component';

describe('ServiciosTagsComponent', () => {
  let component: ServiciosTagsComponent;
  let fixture: ComponentFixture<ServiciosTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
