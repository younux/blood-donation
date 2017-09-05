import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HomeModule } from './home/home.module';
<<<<<<< HEAD
import {DonationModule} from './donation/donation.module';
=======
>>>>>>> 537f360dc3a0ed646e0b6b10882e52ab6139cb99

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


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
    HttpModule,
<<<<<<< HEAD
    HomeModule,
    DonationModule,
=======
    HomeModule
>>>>>>> 537f360dc3a0ed646e0b6b10882e52ab6139cb99
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
