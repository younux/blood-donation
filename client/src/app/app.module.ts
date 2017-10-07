import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule, XHRBackend, RequestOptions} from '@angular/http';

import { HomeModule } from './home/home.module';
import { DonationModule } from './donation/donation.module';
import { ProfileModule } from './profile/profile.module';
import { MyComponentsModule} from './my-utils/my-components/my-components.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { HeaderModule} from './header/header.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';


import { apiInjectables } from './my-utils/my-injectables/api.injectable';
import { AlertService} from './my-utils/my-services/alert.service';
import { MyHttpService} from "./my-utils/my-services/my-http.service";
import { AuthenticationService} from "./my-utils/my-services/authentication.service";
import { AuthGuardService} from "./my-utils/my-services/auth-guard.service";
import {LoaderService} from "./my-utils/my-services/loader.service";

import { myHttpServiceFactory} from "./my-utils/my-services/my-http.service";


import { appRoutes } from './app.routes';
import {LocalStorageService} from "./my-utils/my-services/local-storage.service";
import {AuthenticationStatusEmitterService} from "./my-utils/my-services/authentication-status-emitter.service";



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
    MyComponentsModule,

    BsDatepickerModule.forRoot(),
  ],
  providers: [
    apiInjectables,
    AlertService,
    AuthenticationService,
    AuthenticationStatusEmitterService,
    LocalStorageService,
    LoaderService,
    {
      provide: MyHttpService,
      useFactory: myHttpServiceFactory,
      deps: [XHRBackend, RequestOptions, Router, AuthenticationStatusEmitterService, LocalStorageService, LoaderService],
    },
    AuthGuardService,


  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
