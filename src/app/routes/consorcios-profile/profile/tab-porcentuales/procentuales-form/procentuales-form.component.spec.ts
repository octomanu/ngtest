import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcentualesFormComponent } from './procentuales-form.component';

describe('ProcentualesFormComponent', () => {
  let component: ProcentualesFormComponent;
  let fixture: ComponentFixture<ProcentualesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcentualesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcentualesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
