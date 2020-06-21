import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TroveLayoutComponent } from '@module/trove/layout/trove-layout/trove-layout.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { IndexComponent } from './component/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
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
