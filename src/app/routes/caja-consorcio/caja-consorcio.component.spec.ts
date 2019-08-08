import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaConsorcioComponent } from './caja-consorcio.component';

describe('CajaConsorcioComponent', () => {
  let component: CajaConsorcioComponent;
  let fixture: ComponentFixture<CajaConsorcioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaConsorcioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaConsorcioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
