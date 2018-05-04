import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionGroupListComponent } from './competition-group-list.component';

describe('CompetitionGroupListComponent', () => {
  let component: CompetitionGroupListComponent;
  let fixture: ComponentFixture<CompetitionGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
