import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CajaConsorcioButtonsComponent } from './caja-consorcio-buttons.component';

describe('CajaConsorcioButtonsComponent', () => {
  let component: CajaConsorcioButtonsComponent;
  let fixture: ComponentFixture<CajaConsorcioButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CajaConsorcioButtonsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaConsorcioButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
