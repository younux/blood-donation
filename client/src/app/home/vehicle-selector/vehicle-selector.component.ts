import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-selector',
  templateUrl: './vehicle-selector.component.html',
  styleUrls: ['./vehicle-selector.component.scss']
})
export class VehicleSelectorComponent implements OnInit {
  brand: String;
  model: String;
  version: String;

  constructor() { }

  ngOnInit() {
  }

  setBrand(brand) {
    console.log(brand);
    this.brand = brand;
  }

  setModel(model) {
    this.model = model;
  }

}
