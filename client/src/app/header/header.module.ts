import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material';

import { HeaderComponent } from './header.component';
import {RouterModule} from '@angular/router';


import { TopBarComponent } from './top-bar/top-bar.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from './right-side-bar/right-side-bar.component';
import { AlertBarComponent } from './alert-bar/alert-bar.component';
import { LoaderComponent } from './loader/loader.component';

import { AlertModule } from 'ngx-bootstrap/alert';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatProgressBarModule,
    AlertModule.forRoot(),
  ],
  declarations: [HeaderComponent, LoaderComponent,  TopBarComponent, NavigationBarComponent, LeftSideBarComponent, RightSideBarComponent, AlertBarComponent],
  exports: [HeaderComponent, LoaderComponent, TopBarComponent, NavigationBarComponent, LeftSideBarComponent, RightSideBarComponent, AlertBarComponent],
  providers: [],
})
export class HeaderModule { }
