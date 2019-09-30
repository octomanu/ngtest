import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasButtonsComponent } from './categorias-buttons.component';

describe('CategoriasButtonsComponent', () => {
  let component: CategoriasButtonsComponent;
  let fixture: ComponentFixture<CategoriasButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
