import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import {RouterModule} from "@angular/router";
import { ConnexionStatusComponent } from './connexion-status/connexion-status.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [HeaderComponent, ConnexionStatusComponent, NavBarComponent],
  exports: [HeaderComponent, ConnexionStatusComponent, NavBarComponent],
  providers: [],
})
export class HeaderModule { }