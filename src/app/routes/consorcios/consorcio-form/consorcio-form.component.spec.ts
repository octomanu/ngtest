import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsorcioFormComponent } from './consorcio-form.component';

describe('ConsorcioFormComponent', () => {
  let component: ConsorcioFormComponent;
  let fixture: ComponentFixture<ConsorcioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsorcioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsorcioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
