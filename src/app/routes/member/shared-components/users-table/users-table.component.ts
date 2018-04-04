import { Component, OnInit, Input, ViewChild, AfterViewInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatPaginatorIntl } from '@angular/material';
import { User, TournamentService } from '../../../../shared/tournament.service';
import { AuthService } from '../../../../auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Pipe, PipeTransform } from '@angular/core';
import { DocPipe } from '../../../../shared/doc.pipe';

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
    displayedColumns = ['photo', 'name', 'action'];
    dataSource: MatTableDataSource<User>;


    constructor(
        private tournamentService: TournamentService,
        private auth: AuthService,
        private afAuth: AngularFireAuth,
        private matPag: MatPaginatorIntl,
        private doc: DocPipe,
    ) { }

    ngOnInit() {
        this.matPag.itemsPerPageLabel = 'Users per page: '
    }

    ngAfterViewInit() {
        if (this.userDataType === 'invited') {
            this.tournamentService.getInvitedUsers(this.tournamentID).subscribe(users => {
                this.dataSource = new MatTableDataSource(users);
                this.dataSource.paginator = this.paginator;
            })
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        //this.getUsersByName(changes.data.currentValue);
        if (this.userDataType === 'search') {
            this.tournamentService.getUsersByName(this.data.toLowerCase()).subscribe(users => {
                //exclude logged in user;
                users.forEach((item, index) => {
                    if (item.uid == this.afAuth.auth.currentUser.uid) {
                        users.splice(index, 1);
                    }
                });
                this.dataSource = new MatTableDataSource(users);
                this.dataSource.paginator = this.paginator;
            });
        }

    }

    getUsersByName(data): void {
        this.tournamentService.getUsersByName(data)
    }

    inviteUser(user: User): void {
        this.tournamentService.inviteUser(this.tournamentID, user);
    }

    removedInvitedUser(user: User) {
        this.tournamentService.removeInvitedUser(this.tournamentID, user);
    }
}
