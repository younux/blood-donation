import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-profile-activate',
  templateUrl: './profile-activate.component.html',
  styleUrls: ['./profile-activate.component.scss']
})
export class ProfileActivateComponent implements OnInit {

  showSpinner: boolean;
  message: string

  constructor(private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.message = "Activation ...";
    this.showSpinner = true;
    const key = this.route.snapshot.params['key'];
    const token = this.route.snapshot.params['token'];
    this.authenticationService.activate(key, token).subscribe(
      data => {
        this.message = "Compte activé avec succès ";
        this.showSpinner = false;
        this.alertService.success('You have successfully activated your account');
      },
      err => {
        this.message = "l'URL d'activation est invalide.";
        this.showSpinner = false;
        const alerts = this.alertService.jsonToHtmlList(err);
        this.alertService.error(alerts);
      }
    );
  }

}
