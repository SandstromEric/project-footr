import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TournamentService } from '../../../../shared/tournament.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators/map'

@Component({
    selector: 'app-tournament-filter-list',
    templateUrl: './tournament-filter-list.component.html',
    styleUrls: ['./tournament-filter-list.component.scss']
})
export class TournamentFilterListComponent implements OnInit, OnChanges {
    @Input() privacy: boolean;
    @Input() league: Array<any>;
    @Input() players: string;

    displayedColumns = ['privacy', 'name', 'league', 'players', 'join'];
    dataSource: MatTableDataSource<any>;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private tournamentService: TournamentService, private afAuth: AngularFireAuth) { }

    ngOnInit() {
        //console.log(this.players.split('-').map(str => Number(str)))
    }

    ngOnChanges(changes: SimpleChanges) {
        //console.log(this.leagues)
        if (this.league && this.players) {
            this.tournamentService.findTournaments(this.privacy, Number(this.league), this.players.split('-').map(str => Number(str))).subscribe(tournaments => {
                //exclude joined our owned tournaments
                var filterTournaments = tournaments.filter(tournament => tournament.admin != this.afAuth.auth.currentUser.uid).filter(tournament => !tournament.contestants[this.afAuth.auth.currentUser.uid])
                
                this.dataSource = new MatTableDataSource(filterTournaments);
                this.dataSource.paginator = this.paginator;
            })
        }
    }

    joinTournament(tournamentID: string) {
        this.tournamentService.acceptInvite(tournamentID);
    }

    /* requestJoinLeague(leagueID) {

    } */

}
