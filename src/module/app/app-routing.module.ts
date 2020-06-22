import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TroveLayoutComponent } from '@module/trove/layout/trove-layout/trove-layout.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { IndexComponent } from './component/index/index.component';
import { HelpComponent } from './component/help/help.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'trove',
    component: TroveLayoutComponent,
    loadChildren: () =>
      import('../trove/trove.module').then(module => module.TroveModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
