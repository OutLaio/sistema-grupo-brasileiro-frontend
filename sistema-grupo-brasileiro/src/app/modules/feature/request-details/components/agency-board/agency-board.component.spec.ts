import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyBoardComponent } from './agency-board.component';

describe('AgencyBoardComponent', () => {
  let component: AgencyBoardComponent;
  let fixture: ComponentFixture<AgencyBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgencyBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
