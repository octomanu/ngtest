import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaConsorcioTotalComponent } from './caja-consorcio-total.component';

describe('CajaConsorcioTotalComponent', () => {
  let component: CajaConsorcioTotalComponent;
  let fixture: ComponentFixture<CajaConsorcioTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaConsorcioTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaConsorcioTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
