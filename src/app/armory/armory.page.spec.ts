import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmoryPage } from './armory.page';

describe('ArmoryPage', () => {
  let component: ArmoryPage;
  let fixture: ComponentFixture<ArmoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArmoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
