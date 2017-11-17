import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ComponentsModule } from '../shared/components/components.module';
import { ProfileModule } from '../profiles/profile.module';
import { CarouselModule as PrimeNgCarouselModule } from 'primeng/components/carousel/carousel';
import { CarouselModule as NgxCarouselModule } from 'ngx-bootstrap/carousel';
import { RouterModule } from '@angular/router';






@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    ProfileModule,
    PrimeNgCarouselModule,
    NgxCarouselModule.forRoot(),
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
