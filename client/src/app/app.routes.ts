import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent} from "./faq/faq.component";

import { donationRoutes } from './donations';
import { profileRoutes } from './profiles';
import { blogRoutes } from './blog';


export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  ...profileRoutes,
  ...donationRoutes,
  ...blogRoutes,
  { path: 'about' , component: AboutComponent},
  { path: 'contact' , component: ContactComponent},
  { path: 'faq' , component: FaqComponent},
  { path: '**', redirectTo: 'home' }
];
