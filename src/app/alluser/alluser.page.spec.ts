import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlluserPage } from './alluser.page';

describe('AlluserPage', () => {
  let component: AlluserPage;
  let fixture: ComponentFixture<AlluserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlluserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlluserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
