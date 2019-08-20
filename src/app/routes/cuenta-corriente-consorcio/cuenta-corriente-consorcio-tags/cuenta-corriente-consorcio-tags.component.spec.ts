import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteConsorcioTagsComponent } from './cuenta-corriente-consorcio-tags.component';

describe('CuentaCorrienteConsorcioTagsComponent', () => {
  let component: CuentaCorrienteConsorcioTagsComponent;
  let fixture: ComponentFixture<CuentaCorrienteConsorcioTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteConsorcioTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteConsorcioTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
