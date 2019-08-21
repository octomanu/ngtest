import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteUfTagsComponent } from './cuenta-corriente-uf-tags.component';

describe('CuentaCorrienteUfTagsComponent', () => {
  let component: CuentaCorrienteUfTagsComponent;
  let fixture: ComponentFixture<CuentaCorrienteUfTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteUfTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteUfTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
