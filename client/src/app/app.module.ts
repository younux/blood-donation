import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, XHRBackend, RequestOptions} from '@angular/http';

import { HomeModule } from './home/home.module';
import { DonationModule } from './donation/donation.module';
import { ProfileModule } from './profile/profile.module';
import {MyUtilsModule} from './_utils/my-utils.module';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { apiInjectables } from './_injectables/api.injectables';
import {AlertService} from './_services/alert.service';
import {MyHttpService} from "./_services/my-http.service";
import {IsLoogedInService} from "./_services/is-looged-in.service";

import {myHttpServiceFactory} from "./_services/my-http.service";


import { appRoutes } from './app.routes';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    HomeModule,
    DonationModule,
    ProfileModule,
    MyUtilsModule,

    BsDatepickerModule.forRoot(),
  ],
  providers: [
    apiInjectables,
    AlertService,
    IsLoogedInService,
    {
      provide: MyHttpService,
      useFactory: myHttpServiceFactory,
      deps: [XHRBackend, RequestOptions],
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
