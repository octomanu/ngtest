import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequerasFormComponent } from './chequeras-form.component';
import { NgZorroAntdModule, NzDrawerRef } from 'ng-zorro-antd';
import { of } from 'rxjs';

describe('ChequerasFormComponent', () => {
  let component: ChequerasFormComponent;
  let fixture: ComponentFixture<ChequerasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChequerasFormComponent],
      providers: [
        { provide: NzDrawerRef, useValue: { afterOpen: of('mockObservable') } },
      ],
      imports: [NgZorroAntdModule],
    }).compileComponents();
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
