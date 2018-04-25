import { Component, OnInit, Input, ViewChild, AfterViewInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatPaginatorIntl } from '@angular/material';
import { User, TournamentService } from '../../../../shared/tournament.service';
import { AuthService } from '../../../../auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Pipe, PipeTransform } from '@angular/core';
import { DocPipe } from '../../../../shared/doc.pipe';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';

export interface UserData {
    displayName: string;
    photoURL: string;
    action: string;
    uid: string;
}

@Component({
    selector: 'app-users-table',
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.scss'],
    providers: [DocPipe]
})
export class UsersTableComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() data: string;
    @Input() tournamentID: string;
    @Input() userDataType: string;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    users$: UserData[] = [];
    invites$;
    displayedColumns;
    columnDefs;
    dataSource: MatTableDataSource<User>;
    players;
    constructor(
        private tournamentService: TournamentService,
        private auth: AuthService,
        private afAuth: AngularFireAuth,
        private matPag: MatPaginatorIntl,
        private doc: DocPipe,
    ) {

    }

    ngOnInit() {
        this.matPag.itemsPerPageLabel = 'Users per page: '
        if (this.userDataType === 'invited' || this.userDataType === 'search') {
            this.columnDefs = [
                { columnDef: 'photo', headName: 'Photo', cell: (row) => `${row.photoURL}` },
                { columnDef: 'name', headName: 'Name', cell: (row) => `${row.displayName}` },
                { columnDef: 'action', headName: '', cell: (row) => `${row}` },
            ];
            this.displayedColumns = ['photo', 'name', 'action'];
        } else if (this.userDataType === 'scoreboard') {
            this.columnDefs = [
                { columnDef: 'photo', headName: 'Photo', cell: (row) => `${row.photoURL}` },
                { columnDef: 'name', headName: 'Name', cell: (row) => `${row.displayName}` },
                { columnDef: 'score', headName: 'Score', cell: (row) => `${row.score}` },
            ];
            this.displayedColumns = ['photo', 'name', 'score'];
        }
        this.tournamentService.getPlayers(this.tournamentID).subscribe(players => {
            this.players = players;
        })
    }

    ngAfterViewInit() {
        if (this.userDataType === 'invited') {
            this.tournamentService.getInvitedUsers(this.tournamentID).subscribe(users => {
                this.dataSource = new MatTableDataSource(users);
                this.dataSource.paginator = this.paginator;
            });
        } else if (this.userDataType === 'scoreboard') {
            this.tournamentService.getPlayers(this.tournamentID).subscribe(users => {
                this.dataSource = new MatTableDataSource(users);
                this.dataSource.paginator = this.paginator;
            });
        }

    }

    ngOnChanges(changes: SimpleChanges) {
        //this.getUsersByName(changes.data.currentValue);
        if (this.userDataType === 'search') {
            /* var players = this.tournamentService.getPlayers(this.tournamentID);
            var search = this.tournamentService.getUsersByName(this.data.toLowerCase());

            var list = combineLatest<any[]>(players, search).pipe(
                map(arr => arr.reduce((acc, cur) => acc.concat(cur))),
            )
            list.subscribe(data => {
                data
            }) */

            this.tournamentService.getUsersByName(this.data.toLowerCase()).subscribe(users => {

                //exclude logged in user;
                users.forEach((item, index) => {
                    if (item.uid == this.afAuth.auth.currentUser.uid) {
                        users.splice(index, 1);
                    }
                });
                this.dataSource = new MatTableDataSource(users);
                this.dataSource.paginator = this.paginator;
            })



        }

    }

    alreadyJoined(userID: string): boolean {
        let player = this.players.filter(player => player.uid === userID)[0];
        return player ? false : true;
    }

    getUsersByName(data): void {
        this.tournamentService.getUsersByName(data)
    }

    inviteUser(user: User) {
        this.tournamentService.inviteUser(this.tournamentID, user);
    }

    removedInvitedUser(user: User) {
        this.tournamentService.removeInvitedUser(this.tournamentID, user);
    }
}



