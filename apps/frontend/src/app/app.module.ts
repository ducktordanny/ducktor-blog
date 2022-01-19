import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

import {AppComponent} from './app.component';
import {PagesModule} from './pages/pages.module';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PagesModule,
    MatButtonModule,
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
