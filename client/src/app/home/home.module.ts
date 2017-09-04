import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ListSelectorComponent } from './list-selector/list-selector.component';
import { VehicleSelectorComponent } from './vehicle-selector/vehicle-selector.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomeComponent, ListSelectorComponent, VehicleSelectorComponent]
})
export class HomeModule { }
