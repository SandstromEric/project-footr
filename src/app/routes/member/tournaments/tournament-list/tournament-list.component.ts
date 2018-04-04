import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../../../shared/tournament.service';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {

  myTournaments$;
  pendingInvites$;
  constructor(public tournamentService: TournamentService, public auth: AuthService) { 

  }

  ngOnInit() {
      this.myTournaments$ = this.tournamentService.myTournaments();
      this.pendingInvites$ = this.tournamentService.invitesPending();
  }

  acceptInvite(tournamentID: string) {
      this.tournamentService.acceptInvite(tournamentID);
  }
  removeInvite(tournamentID: string) {
      this.tournamentService.removeInvite(tournamentID);
  }

}
