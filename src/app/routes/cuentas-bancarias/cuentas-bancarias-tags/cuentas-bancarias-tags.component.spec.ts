import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasBancariasTagsComponent } from './cuentas-bancarias-tags.component';

describe('CuentasBancariasTagsComponent', () => {
  let component: CuentasBancariasTagsComponent;
  let fixture: ComponentFixture<CuentasBancariasTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentasBancariasTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasBancariasTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
