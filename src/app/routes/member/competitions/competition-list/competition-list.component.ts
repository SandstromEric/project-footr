import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CompetitionsService } from '../../../../shared/competitions.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MemberService } from '../../../../shared/member.service';
@Component({
    selector: 'app-competition-list',
    templateUrl: './competition-list.component.html',
    styleUrls: ['./competition-list.component.scss']
})
export class CompetitionListComponent implements OnInit, AfterViewInit {
    displayedColumns = ['caption', 'matches', 'matchday', 'teams', 'actions'];
    dataSource;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private cs: CompetitionsService, private ms: MemberService) { }

    ngOnInit() {
        this.ms.setViewTitle('Competitions');
    }

    ngAfterViewInit() {
        this.cs.getCompetitions().subscribe(competitions => {
            console.log(competitions);
            this.dataSource = new MatTableDataSource(competitions)
            this.dataSource.sort = this.sort;
        })
    }

}
