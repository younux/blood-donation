import { Address } from './../../shared/models/address.model';
import { Component, OnInit } from '@angular/core';
import {Donation} from "../../shared/models/donation.model";
import {DonationService} from "../../shared/services/donation.service";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../shared/services/alert.service";
import {BloodCenterService} from "../../shared/services/blood-center.service";
import {BloodCenter} from "../../shared/models/blood-center.model";
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';


@Component({
  selector: 'app-donation-detail',
  templateUrl: './donation-detail.component.html',
  styleUrls: ['./donation-detail.component.scss']
})
export class DonationDetailComponent implements OnInit {

  donation: Donation;
  donationId: number;
  bloodCenters: BloodCenter[];
  lat: number;
  lng: number;
  geocoder: google.maps.Geocoder;
  map: google.maps.Map;
  private latLngBounds = new Subject<any>();


  constructor(private donationService: DonationService,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private bloodCenterService: BloodCenterService,
              private mapsAPILoader: MapsAPILoader,
              ) {

  }

  ngOnInit() {
    // get donation id from query params
    this.donationId = this.route.snapshot.params['id'];
    this.donationService.getDonation(this.donationId).subscribe(
      dataDonationService => {
        // copy donationns
        this.donation = dataDonationService;
        // subscribe to map latLngBounds changes (update every 500 ms)
        this.latLngBounds.asObservable().debounceTime(500).subscribe(
          (latLngBounds) => {
            this.updateBloodCenters(latLngBounds);
          }
        );
        // copy this in self
        let self = this;
        // geocoding donation address (city, country)
        // to center the map on the donation city
        this.mapsAPILoader.load().then( () => {
          // Create a geocoder
          this.geocoder = new google.maps.Geocoder();
          // use geocoder
          this.geocoder.geocode({'address': `${this.donation.city}, ${this.donation.country}`}, function (results, status) {
            if ( status.toString() === "OK") {
              self.lat = results[0].geometry.location.lat().valueOf();
              self.lng = results[0].geometry.location.lng().valueOf();
            } else {
              console.log('google maps geocoder could not find the address. Response status : ', status);
              // Init the map with some values
              self.lat = 51.678418;
              self.lng = 7.809007;
            }
          });
        });
      },
      err => {
        const alerts = this.alertService.jsonToHtmlList(err);
        this.alertService.error(alerts);
      }
      );
  }

  onMapReady(map: any) {
    this.map = map;
  }

  onBoundsChange(latLngBounds: any) {
    this.latLngBounds.next(latLngBounds);
  }

  updateBloodCenters(latLngBounds: any) {
        // Retrieve relevent blood centers to add to the map
        // TODO : Retrieve relevent blood centers based on city and country
        // and add it to the map
        const lat1 = latLngBounds.getNorthEast().lat().valueOf();
        const lat2 = latLngBounds.getSouthWest().lat().valueOf();
        const lng1 = latLngBounds.getNorthEast().lng().valueOf();
        const lng2 = latLngBounds.getSouthWest().lng().valueOf();
        const queryParams = {
          minLat: (lat1 < lat2) ? lat1 : lat2,
          maxLat: (lat1 > lat2) ? lat1 : lat2,
          minLng: (lng1 < lng2) ? lng1 : lng2,
          maxLng: (lng1 > lng2) ? lng1 : lng2,
        };
        queryParams['noPage'] = 'true';
        this.bloodCenterService.listBloodCenters(queryParams).subscribe(
          (dataBloodCenterService) => {
            this.bloodCenters = dataBloodCenterService;
          },
          (err) => {
            const alerts = this.alertService.jsonToHtmlList(err);
            this.alertService.error(alerts);
          }
        );
  }

}
