import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionPredictionListComponent } from './competition-prediction-list.component';

describe('CompetitionPredictionListComponent', () => {
  let component: CompetitionPredictionListComponent;
  let fixture: ComponentFixture<CompetitionPredictionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionPredictionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionPredictionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
