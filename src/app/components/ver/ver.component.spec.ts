/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerComponent } from './ver.component';

describe('VerComponent', () => {
  let component: VerComponent;
  let fixture: ComponentFixture<VerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});