import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalelistPage } from './salelist.page';

describe('SalelistPage', () => {
  let component: SalelistPage;
  let fixture: ComponentFixture<SalelistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalelistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
