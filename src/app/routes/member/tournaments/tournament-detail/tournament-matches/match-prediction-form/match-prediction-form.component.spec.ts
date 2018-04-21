import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPredictionFormComponent } from './match-prediction-form.component';

describe('MatchPredictionFormComponent', () => {
  let component: MatchPredictionFormComponent;
  let fixture: ComponentFixture<MatchPredictionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPredictionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPredictionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
