import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../../../shared/tournament.service';

@Component({
  selector: 'app-tournament-finder',
  templateUrl: './tournament-finder.component.html',
  styleUrls: ['./tournament-finder.component.scss']
})
export class TournamentFinderComponent implements OnInit {
  tournaments$: any;
  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.tournaments$ = this.tournamentService.findTournaments();
    
  }

}
