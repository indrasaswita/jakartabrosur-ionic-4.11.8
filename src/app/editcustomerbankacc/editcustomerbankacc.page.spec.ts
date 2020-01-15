import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcustomerbankaccPage } from './editcustomerbankacc.page';

describe('EditcustomerbankaccPage', () => {
  let component: EditcustomerbankaccPage;
  let fixture: ComponentFixture<EditcustomerbankaccPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcustomerbankaccPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcustomerbankaccPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
