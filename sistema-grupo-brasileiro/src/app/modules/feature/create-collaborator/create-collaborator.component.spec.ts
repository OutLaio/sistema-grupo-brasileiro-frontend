import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollaboratorComponent } from './create-collaborator.component';

describe('CreateCollaboratorComponent', () => {
  let component: CreateCollaboratorComponent;
  let fixture: ComponentFixture<CreateCollaboratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCollaboratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
