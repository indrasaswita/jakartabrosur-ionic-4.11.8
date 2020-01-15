import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CetaksuratjalanPage } from './cetaksuratjalan.page';

describe('CetaksuratjalanPage', () => {
  let component: CetaksuratjalanPage;
  let fixture: ComponentFixture<CetaksuratjalanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CetaksuratjalanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CetaksuratjalanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
