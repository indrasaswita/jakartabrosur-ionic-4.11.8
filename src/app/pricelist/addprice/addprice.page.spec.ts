import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpricePage } from './addprice.page';

describe('AddpricePage', () => {
  let component: AddpricePage;
  let fixture: ComponentFixture<AddpricePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpricePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpricePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
