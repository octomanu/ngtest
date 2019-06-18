import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasFormComponent } from './notas-form.component';

describe('NotasFormComponent', () => {
  let component: NotasFormComponent;
  let fixture: ComponentFixture<NotasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
