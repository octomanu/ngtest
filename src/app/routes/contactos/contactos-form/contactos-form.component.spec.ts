import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactosFormComponent } from './contactos-form.component';

describe('ContactosFormComponent', () => {
  let component: ContactosFormComponent;
  let fixture: ComponentFixture<ContactosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
