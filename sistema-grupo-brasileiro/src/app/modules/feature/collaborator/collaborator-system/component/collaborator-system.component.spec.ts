import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorSystemComponent } from './collaborator-system.component';

describe('CollaboratorSystemComponent', () => {
  let component: CollaboratorSystemComponent;
  let fixture: ComponentFixture<CollaboratorSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollaboratorSystemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollaboratorSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
