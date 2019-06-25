import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequerasTableComponent } from './chequeras-table.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

describe('ChequerasTableComponent', () => {
  let component: ChequerasTableComponent;
  let fixture: ComponentFixture<ChequerasTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequerasTableComponent ],
      imports: [NgZorroAntdModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequerasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
