import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../../../shared/tournament.service';
import { AuthService } from '../../../../auth/auth.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {

  myTournaments$;
  pendingInvites$;
  params = null

  constructor(public tournamentService: TournamentService, public auth: AuthService, private route: ActivatedRoute) { 

  }

  ngOnInit() {
      this.myTournaments$ = this.tournamentService.myTournaments();
      this.pendingInvites$ = this.tournamentService.invitesPending();
  }
  ngAfterViewInit() {
      
  }
  acceptInvite(tournamentID: string) {
      this.tournamentService.acceptInvite(tournamentID);
  }
  removeInvite(tournamentID: string) {
      this.tournamentService.removeInvite(tournamentID);
  }

}
