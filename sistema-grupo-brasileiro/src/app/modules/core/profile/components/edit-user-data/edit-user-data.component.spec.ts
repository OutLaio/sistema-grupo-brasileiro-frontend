import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserDataComponent } from './edit-user-data.component';

describe('EditUserDataComponent', () => {
  let component: EditUserDataComponent;
  let fixture: ComponentFixture<EditUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
