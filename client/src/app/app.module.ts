import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, XHRBackend, RequestOptions} from '@angular/http';

import { HomeModule } from './home/home.module';
import { DonationModule } from './donation/donation.module';
import { ProfileModule } from './profile/profile.module';
import { MyUtilsModule} from './_utils/my-utils.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { HeaderModule} from './header/header.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';

import { apiInjectables } from './_injectables/api.injectable';
import {AlertService} from './_services/alert.service';
import {MyHttpService} from "./_services/my-http.service";
import {IsLoggedInService} from "./_services/is-logged-in.service";

import {myHttpServiceFactory} from "./_services/my-http.service";


import { appRoutes } from './app.routes';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    HeaderModule,
    HomeModule,
    DonationModule,
    ProfileModule,
    MyUtilsModule,

    BsDatepickerModule.forRoot(),
  ],
  providers: [
    apiInjectables,
    AlertService,
    IsLoggedInService,
    {
      provide: MyHttpService,
      useFactory: myHttpServiceFactory,
      deps: [XHRBackend, RequestOptions, Router, IsLoggedInService],
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
