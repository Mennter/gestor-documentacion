import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartelNoborrarComponent } from './cartel-noborrar.component';

describe('CartelNoborrarComponent', () => {
  let component: CartelNoborrarComponent;
  let fixture: ComponentFixture<CartelNoborrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartelNoborrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartelNoborrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
