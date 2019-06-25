import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequesComponent } from './cheques.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

describe('ChequesComponent', () => {
  let component: ChequesComponent;
  let fixture: ComponentFixture<ChequesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequesComponent ],
      imports: [NgZorroAntdModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
