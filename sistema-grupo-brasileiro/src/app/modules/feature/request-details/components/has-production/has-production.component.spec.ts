import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HasProductionComponent } from './has-production.component';

describe('HasProductionComponent', () => {
  let component: HasProductionComponent;
  let fixture: ComponentFixture<HasProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HasProductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HasProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
