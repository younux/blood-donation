import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRegisterComponent } from './profile-register/profile-register.component';
import { ProfileLoginComponent } from './profile-login/profile-login.component';
import {ProfileComponent} from "./profile.component";
import {ProfileService} from "../_services/profile.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {FieldErrorDisplayComponent} from '../_utils/field-error-display/field-error-display.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [ProfileRegisterComponent, ProfileLoginComponent, ProfileComponent, FieldErrorDisplayComponent],
  exports: [ProfileRegisterComponent, ProfileLoginComponent, ProfileComponent],
  providers: [ProfileService],
})
export class ProfileModule { }
