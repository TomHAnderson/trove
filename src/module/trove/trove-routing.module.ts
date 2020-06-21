import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatorListComponent } from './component/creator-list/creator-list.component';
import { CreatorSearchComponent } from './component/creator-search/creator-search.component';
import { CreatorComponent } from './component/creator/creator.component';
// tslint:disable-next-line:max-line-length
import { CreatorIdentifierPerformanceDateComponent } from './component/creator-identifier-performance-date/creator-identifier-performance-date.component';
import { IdentifierComponent } from './component/identifier/identifier.component';

const routes: Routes = [
  {
    path: 'list',
    component: CreatorListComponent
  },
  {
    path: 'search',
    component: CreatorSearchComponent
  },
  {
    path: 'creator/:id',
    component: CreatorComponent
  },
  {
    path: 'creator-identifier-performance-date/:creator_id/:performance_date',
    component: CreatorIdentifierPerformanceDateComponent
  },
  {
    path: 'identifier/:id',
    component: IdentifierComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TroveRoutingModule { }
