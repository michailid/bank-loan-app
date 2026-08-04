import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApplication } from './new-application';

describe('NewApplication', () => {
  let component: NewApplication;
  let fixture: ComponentFixture<NewApplication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewApplication],
    }).compileComponents();

    fixture = TestBed.createComponent(NewApplication);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
