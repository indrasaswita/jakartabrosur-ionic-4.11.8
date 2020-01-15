import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaledetailsPage } from './saledetails.page';

describe('SaledetailsPage', () => {
  let component: SaledetailsPage;
  let fixture: ComponentFixture<SaledetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaledetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaledetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
