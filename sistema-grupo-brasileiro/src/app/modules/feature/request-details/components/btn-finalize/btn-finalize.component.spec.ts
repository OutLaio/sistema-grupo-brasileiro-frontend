import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnFinalizeComponent } from './btn-finalize.component';

describe('BtnFinalizeComponent', () => {
  let component: BtnFinalizeComponent;
  let fixture: ComponentFixture<BtnFinalizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnFinalizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnFinalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
