import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasFilterComponent } from './categorias-filter.component';

describe('CategoriasFilterComponent', () => {
  let component: CategoriasFilterComponent;
  let fixture: ComponentFixture<CategoriasFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
