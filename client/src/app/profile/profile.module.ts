import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRegisterComponent } from './profile-register/profile-register.component';
import { ProfileLoginComponent } from './profile-login/profile-login.component';
import {ProfileComponent} from "./profile.component";
import {ProfileService} from "../_services/profile.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MyUtilsModule} from '../_utils/my-utils.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MyUtilsModule,
  ],
  declarations: [ProfileRegisterComponent, ProfileLoginComponent, ProfileComponent],
  exports: [ProfileRegisterComponent, ProfileLoginComponent, ProfileComponent],
  providers: [ProfileService],
})
export class ProfileModule { }
