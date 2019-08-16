import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosBasicosTabComponent } from './datos-basicos-tab.component';

describe('DatosBasicosTabComponent', () => {
  let component: DatosBasicosTabComponent;
  let fixture: ComponentFixture<DatosBasicosTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosBasicosTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosBasicosTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
