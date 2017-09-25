import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import {RouterModule} from "@angular/router";
import { ConnexionStatusComponent } from './connexion-status/connexion-status.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [HeaderComponent, ConnexionStatusComponent],
  exports: [HeaderComponent, ConnexionStatusComponent],
  providers: [],
})
export class HeaderModule { }
