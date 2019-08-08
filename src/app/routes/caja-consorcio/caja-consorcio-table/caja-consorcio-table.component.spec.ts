import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaConsorcioTableComponent } from './caja-consorcio-table.component';

describe('CajaConsorcioTableComponent', () => {
  let component: CajaConsorcioTableComponent;
  let fixture: ComponentFixture<CajaConsorcioTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaConsorcioTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaConsorcioTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
