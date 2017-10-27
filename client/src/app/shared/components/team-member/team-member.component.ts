import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})
export class TeamMemberComponent implements OnInit {

  @Input() fullName: string;
  @Input() role: string;
  @Input() imgSrc: string;
  @Input() facebook: string = null;
  @Input() twitter: string = null;
  @Input() googlePlus: string = null;
  @Input() linkedin: string = null;


  constructor() { }

  ngOnInit() {
  }

}
