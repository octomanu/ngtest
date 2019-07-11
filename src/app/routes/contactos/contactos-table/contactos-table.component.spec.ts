import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactosTableComponent } from './contactos-table.component';

describe('ContactosTableComponent', () => {
  let component: ContactosTableComponent;
  let fixture: ComponentFixture<ContactosTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactosTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
