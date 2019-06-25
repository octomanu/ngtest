import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequerasFormComponent } from './chequeras-form.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

describe('ChequerasFormComponent', () => {
  let component: ChequerasFormComponent;
  let fixture: ComponentFixture<ChequerasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequerasFormComponent ],
      imports: [NgZorroAntdModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequerasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
