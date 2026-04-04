import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindEmployee } from './find-employee';

describe('FindEmployee', () => {
  let component: FindEmployee;
  let fixture: ComponentFixture<FindEmployee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindEmployee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindEmployee);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
