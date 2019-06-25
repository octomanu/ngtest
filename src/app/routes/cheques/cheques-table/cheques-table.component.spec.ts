import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequesTableComponent } from './cheques-table.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

describe('ChequesTableComponent', () => {
  let component: ChequesTableComponent;
  let fixture: ComponentFixture<ChequesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequesTableComponent ],
      imports: [NgZorroAntdModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
