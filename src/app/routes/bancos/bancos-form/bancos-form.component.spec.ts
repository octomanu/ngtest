import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BancosFormComponent } from './bancos-form.component';

describe('BancosFormComponent', () => {
  let component: BancosFormComponent;
  let fixture: ComponentFixture<BancosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
