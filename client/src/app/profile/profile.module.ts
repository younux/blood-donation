import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRegisterComponent } from './profile-register/profile-register.component';
import { ProfileLoginComponent } from './profile-login/profile-login.component';
import {ProfileComponent} from "./profile.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MyComponentsModule} from '../my-utils/my-components/my-components.module';
import {ConnectionBackend} from "@angular/http";
import { ProfileMyComponent } from './profile-my/profile-my.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MyComponentsModule,
  ],
  declarations: [ProfileRegisterComponent, ProfileLoginComponent, ProfileComponent, ProfileMyComponent],
  exports: [ProfileRegisterComponent, ProfileLoginComponent, ProfileComponent, ProfileMyComponent],
  providers: [],
})
export class ProfileModule { }
