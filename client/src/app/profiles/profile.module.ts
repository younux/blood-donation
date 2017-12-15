import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../shared/components/components.module';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


import {
  ProfileRegisterComponent,
  ProfileLoginComponent,
  ProfileComponent,
  ProfileMyComponent,
  ProfileActivateComponent,
  PasswordResetRequestComponent,
  PasswordResetComponent,
} from '.';

const declarations = [
  ProfileRegisterComponent,
  ProfileLoginComponent,
  ProfileComponent,
  ProfileMyComponent,
  ProfileActivateComponent,
  PasswordResetRequestComponent,
  PasswordResetComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [...declarations],
  exports: [...declarations],
  providers: []
})
export class ProfileModule {
}
