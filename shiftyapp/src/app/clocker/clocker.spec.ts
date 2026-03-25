import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Clocker } from './clocker';

describe('Clocker', () => {
  let component: Clocker;
  let fixture: ComponentFixture<Clocker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Clocker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Clocker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
