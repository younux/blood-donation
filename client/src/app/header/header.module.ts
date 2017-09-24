import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { ProfileStatusComponent } from './profile-status/profile-status.component';
import {RouterModule} from "@angular/router";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [HeaderComponent, ProfileStatusComponent],
  exports: [HeaderComponent, ProfileStatusComponent],
  providers: [],
})
export class HeaderModule { }
