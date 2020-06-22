import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TroveModule } from '@module/trove/trove.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env';
import { IndexComponent } from './component/index/index.component';
import { HelpComponent } from './component/help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    IndexComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TroveModule,
    NgbModule,
    LoadingBarHttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
