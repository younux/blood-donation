import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, XHRBackend} from '@angular/http';

import { HomeModule } from './home/home.module';
import { DonationModule } from './donation/donation.module';
import { ProfileModule } from './profile/profile.module';
import {MyUtilsModule} from './_utils/my-utils.module';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


import {AlertService} from './_services/alert.service';

import { appRoutes } from './app.routes';
import { apiInjectables } from './_injectables/api.injectables';
import {MyHttpService} from "./_services/my-http.service";
import {RequestOptions} from "@angular/http";
import {IsLoogedInService} from "./_services/is-looged-in.service";


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
    {
      provide: MyHttpService,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new MyHttpService(backend, options);
      },
      deps: [XHRBackend, RequestOptions],
    },
    IsLoogedInService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
