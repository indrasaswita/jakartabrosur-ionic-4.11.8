import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersalesPage } from './customersales.page';

describe('CustomersalesPage', () => {
  let component: CustomersalesPage;
  let fixture: ComponentFixture<CustomersalesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersalesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
