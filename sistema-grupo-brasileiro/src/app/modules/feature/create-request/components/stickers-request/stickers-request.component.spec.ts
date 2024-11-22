import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickersRequestComponent } from './stickers-request.component';

describe('StickersRequestComponent', () => {
  let component: StickersRequestComponent;
  let fixture: ComponentFixture<StickersRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StickersRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickersRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
