import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentCreateDialogComponent } from './tournament-create-dialog.component';

describe('TournamentCreateDialogComponent', () => {
  let component: TournamentCreateDialogComponent;
  let fixture: ComponentFixture<TournamentCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
