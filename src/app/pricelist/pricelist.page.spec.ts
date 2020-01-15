import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricelistPage } from './pricelist.page';

describe('PricelistPage', () => {
  let component: PricelistPage;
  let fixture: ComponentFixture<PricelistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricelistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
