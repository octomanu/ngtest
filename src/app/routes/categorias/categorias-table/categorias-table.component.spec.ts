import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasTableComponent } from './categorias-table.component';

describe('CategoriasTableComponent', () => {
  let component: CategoriasTableComponent;
  let fixture: ComponentFixture<CategoriasTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
