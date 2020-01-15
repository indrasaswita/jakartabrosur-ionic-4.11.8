import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerpaymentPage } from './customerpayment.page';

describe('CustomerpaymentPage', () => {
  let component: CustomerpaymentPage;
  let fixture: ComponentFixture<CustomerpaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerpaymentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerpaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
