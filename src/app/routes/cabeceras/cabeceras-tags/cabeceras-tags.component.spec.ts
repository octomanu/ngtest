import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecerasTagsComponent } from './cabeceras-tags.component';

describe('CabecerasTagsComponent', () => {
  let component: CabecerasTagsComponent;
  let fixture: ComponentFixture<CabecerasTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabecerasTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabecerasTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
