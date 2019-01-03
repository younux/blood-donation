import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BloodCenterComponent } from './blood-center.component';
import { BloodCenterCreateComponent } from './blood-center-create/blood-center-create.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ComponentsModule } from '../shared/components/components.module';
import { BloodCenterDashboardComponent } from './blood-center-dashboard/blood-center-dashboard.component';
import { BloodCenterListComponent } from './blood-center-list/blood-center-list.component';
import { BloodCenterDetailComponent } from './blood-center-detail/blood-center-detail.component';
import { BloodCenterThumbnailComponent } from './blood-center-thumbnail/blood-center-thumbnail.component';
import { BloodCenterUpdateComponent } from './blood-center-update/blood-center-update.component';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYvCehzGZfMfMDA9oOHjxAJSbCwwWZQjo',
      libraries: ['places'],
    }),
    PaginationModule.forRoot(),

    ComponentsModule,
  ],
  declarations: [BloodCenterComponent,
    BloodCenterCreateComponent,
    BloodCenterDashboardComponent,
    BloodCenterListComponent,
    BloodCenterDetailComponent,
    BloodCenterThumbnailComponent,
    BloodCenterUpdateComponent],
  exports: [],
  providers: []
})
export class BloodCenterModule { }
