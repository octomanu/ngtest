import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequerasComponent } from './chequeras.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

describe('ChequerasComponent', () => {
  let component: ChequerasComponent;
  let fixture: ComponentFixture<ChequerasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequerasComponent ],
      imports: [NgZorroAntdModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
