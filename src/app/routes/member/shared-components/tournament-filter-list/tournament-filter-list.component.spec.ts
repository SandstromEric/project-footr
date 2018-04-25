import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentFilterListComponent } from './tournament-filter-list.component';

describe('TournamentFilterListComponent', () => {
  let component: TournamentFilterListComponent;
  let fixture: ComponentFixture<TournamentFilterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentFilterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentFilterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
