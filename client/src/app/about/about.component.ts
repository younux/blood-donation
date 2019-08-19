import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  pageHeaderContent = "About us";

  headingTitle = "Notre équipe";
  headingContent = "Notre équipe est composée d'ingénieurs talentueux";

  memberName1 = "XXXXXX XXXXXX";
  memberRole1 = "Co-Founder";
  memberImg1 = "/assets/images/team_9.jpg";
  memberFacebook1 ="aaaa";
  memberTwitter1 ="aaaa";
  memberGooglePlus1 ="aaa";
  memberLinkedin1 ="aa";

  memberName2 = "XXXXXX XXXXXX";
  memberRole2 = "Co-Founder";
  memberImg2 = "/assets/images/team_9.jpg";
  memberFacebook2 ="aaaa";
  memberTwitter2 ="aaaaa";
  memberGooglePlus2 ="aaaaa";
  memberLinkedin2 ="aaaa";

  memberName3 = "XXXXXX XXXXXX";
  memberRole3 = "Co-Founder";
  memberImg3 = "/assets/images/team_9.jpg";
  memberFacebook3 ="aaaa";
  memberTwitter3 ="aaaa";
  memberGooglePlus3 ="aaa";
  memberLinkedin3 ="aaa";

  constructor() {

  }

  ngOnInit() {
  }

}
