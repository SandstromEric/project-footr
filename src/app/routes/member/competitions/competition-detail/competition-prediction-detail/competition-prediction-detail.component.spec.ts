import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionPredictionDetailComponent } from './competition-prediction-detail.component';

describe('CompetitionPredictionDetailComponent', () => {
  let component: CompetitionPredictionDetailComponent;
  let fixture: ComponentFixture<CompetitionPredictionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionPredictionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionPredictionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
