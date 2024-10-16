import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullLuminousRequestComponent } from './full-luminous-request.component';

describe('FullLuminousRequestComponent', () => {
  let component: FullLuminousRequestComponent;
  let fixture: ComponentFixture<FullLuminousRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullLuminousRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullLuminousRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
