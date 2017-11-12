import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../shared/components/components.module';

import {
  ProfileRegisterComponent,
  ProfileLoginComponent,
  ProfileComponent,
  ProfileMyComponent
} from '.';
import { ProfileActivateComponent } from './profile-activate/profile-activate.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

const declarations = [
  ProfileRegisterComponent,
  ProfileLoginComponent,
  ProfileComponent,
  ProfileMyComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule
  ],
  declarations: [...declarations, ProfileActivateComponent, PasswordResetRequestComponent, PasswordResetComponent],
  exports: [...declarations, ProfileActivateComponent, PasswordResetRequestComponent, PasswordResetComponent],
  providers: []
})
export class ProfileModule {
}
