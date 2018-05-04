import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../shared/member.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private ms: MemberService) { }

  ngOnInit() {
    this.ms.setViewTitle('Dashboard');
  }

}
