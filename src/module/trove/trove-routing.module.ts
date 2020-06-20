import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatorListComponent } from './component/creator-list/creator-list.component';
import { CreatorSearchComponent } from './component/creator-search/creator-search.component';
import { CreatorComponent } from './component/creator/creator.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TroveRoutingModule { }
