import { Component, OnInit, Input, ViewChild, AfterViewInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatPaginatorIntl } from '@angular/material';
import { User, TournamentService } from '../../../../shared/tournament.service';
import { AuthService } from '../../../../auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

export interface UserData {
    displayName: string;
    photoURL: string;
    action: string;
    uid: string;
}

@Component({
    selector: 'app-users-table',
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() data: string;
    @Input() tournamentID: string;
    @Input() userDataType: string;
    users$: UserData[] = [];
    displayedColumns = ['photo', 'name', 'action'];
    dataSource: MatTableDataSource<User>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private tournamentService: TournamentService,
        private auth: AuthService,
        private afAuth: AngularFireAuth,
        private matPag: MatPaginatorIntl,
    ) { }

    ngOnInit() {
        this.matPag.itemsPerPageLabel = 'Users per page: '
    }

    ngAfterViewInit() {
        if (this.userDataType === 'invited') {
            this.tournamentService.getInvitedUsers(this.tournamentID).subscribe(data => {
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
            });
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        //this.getUsersByName(changes.data.currentValue);
        if (this.userDataType === 'search') {
            this.tournamentService.getUsersByName(this.data.toLowerCase()).subscribe(data => {
                //exclude logged in user;
                data.forEach((item, index) => {
                    if (item.uid == this.afAuth.auth.currentUser.uid) {
                        data.splice(index, 1);
                    }
                });
                this.dataSource = new MatTableDataSource(data);
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
}
