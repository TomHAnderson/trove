import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatorListComponent } from './component/creator-list/creator-list.component';
import { TroveRoutingModule } from './trove-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TroveLayoutComponent } from './layout/trove-layout/trove-layout.component';

@NgModule({
  declarations: [
    CreatorListComponent,
    TroveLayoutComponent
  ],
  imports: [
    CommonModule,
    TroveRoutingModule,
    SharedModule,
  ]
})
export class TroveModule { }
