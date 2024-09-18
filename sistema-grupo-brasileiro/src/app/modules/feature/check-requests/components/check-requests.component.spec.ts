import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckRequestsComponent } from './check-requests.component';

describe('CheckRequestsComponent', () => {
  let component: CheckRequestsComponent;
  let fixture: ComponentFixture<CheckRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
