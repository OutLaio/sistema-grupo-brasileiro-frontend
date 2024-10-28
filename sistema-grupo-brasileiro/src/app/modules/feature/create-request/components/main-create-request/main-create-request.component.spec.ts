import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCreateRequestComponent } from './main-create-request.component';

describe('MainCreateRequestComponent', () => {
  let component: MainCreateRequestComponent;
  let fixture: ComponentFixture<MainCreateRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainCreateRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCreateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
