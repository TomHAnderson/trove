import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatorListComponent } from './component/creator-list/creator-list.component';

const routes: Routes = [
  {
    path: 'creator',
    component: CreatorListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TroveRoutingModule { }
