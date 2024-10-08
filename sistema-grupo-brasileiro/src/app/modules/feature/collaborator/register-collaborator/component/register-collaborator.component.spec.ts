import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCollaboratorComponent } from './register-collaborator.component';

describe('RegisterCollaboratorComponent', () => {
  let component: RegisterCollaboratorComponent;
  let fixture: ComponentFixture<RegisterCollaboratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterCollaboratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
