import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerComponent } from './sticker.component';

describe('StickerComponent', () => {
  let component: StickerComponent;
  let fixture: ComponentFixture<StickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
