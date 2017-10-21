import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import {RouterModule} from '@angular/router';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [HeaderComponent,  TopBarComponent, NavigationBarComponent],
  exports: [HeaderComponent, TopBarComponent, NavigationBarComponent],
  providers: [],
})
export class HeaderModule { }
