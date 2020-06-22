import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatorListComponent } from './component/creator-list/creator-list.component';
import { TroveRoutingModule } from './trove-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TroveLayoutComponent } from './layout/trove-layout/trove-layout.component';
import { CreatorSearchComponent } from './component/creator-search/creator-search.component';
import { CreatorComponent } from './component/creator/creator.component';
// tslint:disable-next-line:max-line-length
import { CreatorIdentifierPerformanceDateComponent } from './component/creator-identifier-performance-date/creator-identifier-performance-date.component';
import { IdentifierComponent } from './component/identifier/identifier.component';
import { FavoriteCreatorComponent } from './component/favorite-creator/favorite-creator.component';
import { FavoriteIdentifierComponent } from './component/favorite-identifier/favorite-identifier.component';

@NgModule({
  declarations: [
    CreatorListComponent,
    TroveLayoutComponent,
    CreatorSearchComponent,
    CreatorComponent,
    CreatorIdentifierPerformanceDateComponent,
    IdentifierComponent,
    FavoriteCreatorComponent,
    FavoriteIdentifierComponent,
  ],
  imports: [
    CommonModule,
    TroveRoutingModule,
    SharedModule,
  ]
})
export class TroveModule { }
