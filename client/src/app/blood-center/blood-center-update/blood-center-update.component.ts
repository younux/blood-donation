import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import {BloodCenterService} from "../../shared/services/blood-center.service";
import {AlertService} from "../../shared/services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BloodCenter} from "../../shared/models/blood-center.model";


@Component({
  selector: 'app-blood-center-update',
  templateUrl: './blood-center-update.component.html',
  styleUrls: ['./blood-center-update.component.scss']
})
export class BloodCenterUpdateComponent implements OnInit {

  @ViewChild('loactionInput') loactionInput: ElementRef;
  bloodCenterForm: FormGroup;
  geocoder: google.maps.Geocoder;
  lat: number;
  lng: number;
  bloodCenter: BloodCenter;
  isLocationSelected: boolean = false;


  constructor(private fb: FormBuilder,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private bloodCenterService: BloodCenterService,
              private alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.createBloodCenterForm();
    const bloodCenterId = this.route.snapshot.params['id'];
    this.bloodCenterService.getBloodCenter(bloodCenterId).subscribe(
      (data) => {
        this.lat = data.latitude;
        this.lng = data.longitude;
        this.bloodCenter = data;
        this.isLocationSelected = true;
        this.initBloodCenterFormValues();

        // Loading the maps API
        this.mapsAPILoader.load().then( () => {
          // Create a geocoder (will be used for geocoding when clicking on the map)
          this.geocoder = new google.maps.Geocoder();
          // Create autocomplete
          const autocomplete = new google.maps.places.Autocomplete(this.loactionInput.nativeElement, {
            types: ['address'],
          });
          // Listen to autocomplete
          autocomplete.addListener('place_changed', () => {
            this.ngZone.run(() => {
              // get the selected place
              const place: google.maps.places.PlaceResult = autocomplete.getPlace();
              if (place.geometry === undefined || place.geometry === null) {
                this.isLocationSelected = false;
                const name = this.bloodCenterForm.value.name;
                this.bloodCenterForm.reset();
                this.bloodCenterForm.controls['name'].setValue(name);
                return;
              }
              // set the altitude and longitude to the selected place
              this.lat = place.geometry.location.lat();
              this.lng = place.geometry.location.lng();
              this.isLocationSelected = true;
              this.updateBloodCenterFormValues(place.address_components);
            });
          });
        });
      },
      (err) => {
        this.alertService.error(this.alertService.jsonToHtmlList(err));
    });

  }

  createBloodCenterForm() {
    this.bloodCenterForm = this.fb.group({
      name: [null, Validators.required],
      address: this.fb.group({
        street: [null, Validators.required],
        city: [null, Validators.required],
        country: [null, Validators.required],
        zipCode: [null, Validators.required],
      }),
    });
  }

  initBloodCenterFormValues() {
    this.bloodCenterForm.setValue({
      name: this.bloodCenter.name,
      address: {
        street: this.bloodCenter.address.street,
        city: this.bloodCenter.address.city,
        country: this.bloodCenter.address.country,
        zipCode: this.bloodCenter.address.zipCode,
      },
    });
  }

  onBloodCenterFormSubmit() {
    this.bloodCenterService.updateBloodCenter(this.bloodCenter.id,
      this.bloodCenterForm.value.name,
      this.bloodCenterForm.value.address,
      this.lat,
      this.lng).subscribe(
      (data) => {
        this.alertService.success('You have succefully updated the blood center');
      },
      (err) => {
        this.alertService.error(this.alertService.jsonToHtmlList(err));
      });
  }

  onMapClicked(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.isLocationSelected = true;
    this.geocodeLatLng();
  }

  geocodeLatLng() {
    const latlng = {lat: this.lat, lng: this.lng};
    let self = this; // 'self' is used inside geocoder promise (I could not use 'this' inside this
    // promise to refer to my component's instance)
    this.geocoder.geocode({location: latlng}, function (results, status) {
      if ( status.toString() === "OK") {
        self.updateBloodCenterFormValues(results[0].address_components);
        self.loactionInput.nativeElement.value = results[0].formatted_address;
      } else {
        console.log('google maps geocoder could not find the address. Response status : ', status);
        // Reset form and locationInput value
        const name = self.bloodCenterForm.value.name;
        self.bloodCenterForm.reset();
        self.bloodCenterForm.controls['name'].setValue(name);
        self.loactionInput.nativeElement.value = null;
      }
    });
  }

  updateBloodCenterFormValues(address_components: any) {
    // this object is used to retrieve address information from google maps response
    const addressComponentsTypes = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      country: 'long_name',
      postal_code: 'short_name'
    };
    // init a local var that will contain the address values
    let addressComponents = {
      street_number: null,
      route: null,
      locality: null,
      country: null,
      postal_code: null,
    };
    // retrieve the address values and put it in addressComponents
    for (let i = 0; i < address_components.length; i++) {
      const addressComponentType = address_components[i].types[0];
      if (addressComponentsTypes[addressComponentType]) {
        addressComponents[addressComponentType] =
          address_components[i][addressComponentsTypes[addressComponentType]];
      }
    }
    // set the form values with the new address values
    if (addressComponents['route']) {
      (this.bloodCenterForm.controls['address'] as FormGroup).controls['street'].setValue(
        ((addressComponents['street_number'] !== null) ? (addressComponents['street_number'] + ' ') : '')
        + addressComponents['route']);
    } else {
      (this.bloodCenterForm.controls['address'] as FormGroup).controls['street'].setValue(null);
    }
    if (addressComponents['locality']) {
      (this.bloodCenterForm.controls['address'] as FormGroup).controls['city'].setValue(
        addressComponents['locality']);
    } else {
      (this.bloodCenterForm.controls['address'] as FormGroup).controls['city'].setValue(null);
    }
    if (addressComponents['country']) {
      (this.bloodCenterForm.controls['address'] as FormGroup).controls['country'].setValue(
        addressComponents['country']);
    } else {
      (this.bloodCenterForm.controls['address'] as FormGroup).controls['country'].setValue(null);
    }
    if (addressComponents['postal_code']) {
      (this.bloodCenterForm.controls['address'] as FormGroup).controls['zipCode'].setValue(
        addressComponents['postal_code']);
    } else {
      (this.bloodCenterForm.controls['address'] as FormGroup).controls['zipCode'].setValue(null);
    }
  }

  onClickDelete() {
    this.bloodCenterService.deleteBloodCenter(this.bloodCenter.id).subscribe(
      (data) => {
        this.router.navigate(['/blood-centers', 'dashboard']);
        this.alertService.success('You have succefully deleted the blood center');
        },
      (err) => {
        this.alertService.error(this.alertService.jsonToHtmlList(err));
      });
  }
}
