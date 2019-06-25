import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequesFormComponent } from './cheques-form.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

describe('ChequesFormComponent', () => {
  let component: ChequesFormComponent;
  let fixture: ComponentFixture<ChequesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequesFormComponent ],
      imports: [NgZorroAntdModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
