import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyComponentsModule } from '../my-utils/my-components/my-components.module';

import {
  ProfileRegisterComponent,
  ProfileLoginComponent,
  ProfileComponent,
  ProfileMyComponent
} from '.';

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
    MyComponentsModule
  ],
  declarations: [...declarations],
  exports: [...declarations],
  providers: []
})
export class ProfileModule {
}
