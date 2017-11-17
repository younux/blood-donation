import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  sponsors = [
    {
      'name' : "sponsor 1",
      'logo' : "/assets/images/logo_1.jpg",
    },
    {
      'name' : "sponsor 2",
      'logo' : "/assets/images/logo_1.jpg",
    },
    {
      'name' : "sponsor 3",
      'logo' : "/assets/images/logo_1.jpg",
    },
    {
      'name' : "sponsor 4",
      'logo' : "/assets/images/logo_1.jpg",
    },
    {
      'name' : "sponsor 5",
      'logo' : "/assets/images/logo_1.jpg",
    },
    {
      'name' : "sponsor 6",
      'logo' : "/assets/images/logo_1.jpg",
    },
    {
      'name' : "sponsor 7",
      'logo' : "/assets/images/logo_1.jpg",
    },
    {
      'name' : "sponsor 8",
      'logo' : "/assets/images/logo_1.jpg",
    },
  ]

  sponsorsHeadingTitle = "our sponsors";
  sponsorsHeadingContent = "The sponsors who give their valuable amount to fulfill our mission.";

  howToHeadingTitle = "How our platform works";
  howToHeadingContent = "Here is a brief introduction to our platform features";


  imgSrc = "/assets/images/process_1.jpg";
  stepNumber = "";
  title = "REGISTRATION";
  content = "You need to complete a very simple registration form. Which contains all required contact information to enter in the donation process.";

  teamHeadingTitle = "Notre équipe";
  teamHheadingContent = "Notre est composée d'ingénieurs talentueux";

  memberName1 = "YOUNES BENHOUMICH";
  memberRole1 = "Co-Founder";
  memberImg1 = "/assets/images/team_9.jpg";
  memberFacebook1 ="aaaa";
  memberTwitter1 ="aaaa";
  memberGooglePlus1 ="aaa";
  memberLinkedin1 ="aa";

  memberName2 = "YOUNES BENHOUMICH";
  memberRole2 = "Co-Founder";
  memberImg2 = "/assets/images/team_9.jpg";
  memberFacebook2 ="aaaa";
  memberTwitter2 ="aaaaa";
  memberGooglePlus2 ="aaaaa";
  memberLinkedin2 ="aaaa";

  memberName3 = "YOUNES BENHOUMICH";
  memberRole3 = "Co-Founder";
  memberImg3 = "/assets/images/team_9.jpg";
  memberFacebook3 ="aaaa";
  memberTwitter3 ="aaaa";
  memberGooglePlus3 ="aaa";
  memberLinkedin3 ="aaa";

  ctaTitle = "WE ARE HELPING PEOPLE FROM 40 YEARS";
  ctaContent ="You can give blood at any of our blood donation venues all over the world. We have total sixty" +
    " thousands donor centers and visit thousands of other venues on various occasions.";
  ctaButtonText ="Become Volunter";
  ctaRouterLinkArray: Array<string> = null;

  constructor() { }

  ngOnInit() {
  }


}
