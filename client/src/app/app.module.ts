import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule, XHRBackend, RequestOptions} from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';


import { HomeModule } from './home/home.module';
import { DonationModule } from './donations/donation.module';
import { ProfileModule } from './profiles/profile.module';
import { ComponentsModule} from './shared/components/components.module';
import { HeaderModule} from './header/header.module';
import { BlogModule } from './blog/blog.module';
import { BloodCenterModule } from './blood-center/blood-center.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';


import { apiInjectables } from './shared/injectables/api.injectable';
import { AlertService} from './shared/services/alert.service';
import { MyHttpService} from './shared/services/my-http.service';
import { AuthenticationService} from './shared/services/authentication.service';
import { AuthGuardService} from './shared/services/auth-guard.service';
import { ModeratorGuardService} from './shared/services/moderator-guard.service';
import {LoaderService} from './header/loader/loader.service';
import {WindowRefService} from './shared/services/window-ref.service';
import { BloodCenterService} from './shared/services/blood-center.service';

import { myHttpServiceFactory} from './shared/services/my-http.service';


import { appRoutes } from './app.routes';
import {LocalStorageService} from './shared/services/local-storage.service';
import {AuthenticationStatusEmitterService} from './shared/services/authentication-status-emitter.service';
import { FaqComponent } from './faq/faq.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    FaqComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatSidenavModule,

    HeaderModule,
    HomeModule,
    DonationModule,
    ProfileModule,
    ComponentsModule,
    BlogModule,
    BloodCenterModule,
  ],
  providers: [
    ...apiInjectables,
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
    WindowRefService,
    ModeratorGuardService,
    BloodCenterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
