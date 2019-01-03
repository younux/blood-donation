import { Component, OnInit } from '@angular/core';
import {BloodCenterService} from "../../shared/services/blood-center.service";
import {ActivatedRoute} from "@angular/router";
import {BloodCenter} from "../../shared/models/blood-center.model";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-blood-center-detail',
  templateUrl: './blood-center-detail.component.html',
  styleUrls: ['./blood-center-detail.component.scss']
})
export class BloodCenterDetailComponent implements OnInit {
  bloodCenter: BloodCenter;

  constructor(private bloodCenterService: BloodCenterService,
              private route: ActivatedRoute,
              private alertService: AlertService) { }

  ngOnInit() {
    const bloodCenterId = this.route.snapshot.params['id'];
    this.bloodCenterService.getBloodCenter(bloodCenterId).subscribe(
      (data) => {
        this.bloodCenter = data;
      },
      (err) => {
        this.alertService.error(this.alertService.jsonToHtmlList(err));
      });
  }

}
