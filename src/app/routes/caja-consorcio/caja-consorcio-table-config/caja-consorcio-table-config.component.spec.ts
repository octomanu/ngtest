import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaConsorcioTableConfigComponent } from './caja-consorcio-table-config.component';

describe('CajaConsorcioTableConfigComponent', () => {
  let component: CajaConsorcioTableConfigComponent;
  let fixture: ComponentFixture<CajaConsorcioTableConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaConsorcioTableConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaConsorcioTableConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
