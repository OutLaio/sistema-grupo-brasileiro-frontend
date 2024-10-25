import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyBoardRequestComponent } from './agency-board-request.component';

describe('AgencyBoardRequestComponent', () => {
  let component: AgencyBoardRequestComponent;
  let fixture: ComponentFixture<AgencyBoardRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgencyBoardRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyBoardRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
