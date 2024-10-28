import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignpostRequestComponent } from './signpost-request.component';

describe('SignpostRequestComponent', () => {
  let component: SignpostRequestComponent;
  let fixture: ComponentFixture<SignpostRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignpostRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignpostRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
