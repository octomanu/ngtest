import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigFormComponent } from './config-form.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

describe('ConfigFormComponent', () => {
  let component: ConfigFormComponent;
  let fixture: ComponentFixture<ConfigFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigFormComponent ],
      imports: [NgZorroAntdModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
