import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TroveLayoutComponent } from '@module/trove/layout/trove-layout/trove-layout.component';


const routes: Routes = [{
  path: '',
  component: TroveLayoutComponent,
  children: [
    {
      path: 'creator',
      loadChildren: () =>
        import('../trove/trove.module').then(m => m.TroveModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
