import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesFuncionalesFormComponent } from './unidades-funcionales-form.component';

describe('UnidadesFuncionalesFormComponent', () => {
  let component: UnidadesFuncionalesFormComponent;
  let fixture: ComponentFixture<UnidadesFuncionalesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadesFuncionalesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesFuncionalesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
