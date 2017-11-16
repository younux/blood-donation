import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ComponentsModule } from '../shared/components/components.module';
import { ProfileModule } from '../profiles/profile.module';
import {TemplateComponentsModule} from '../shared/template-components/template-components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    ProfileModule,
    TemplateComponentsModule,
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
