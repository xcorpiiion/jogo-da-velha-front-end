import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SigninModule} from './signin/signin.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthInterceptor} from './interceptor/auth.interceptor';
import {ErrorInterceptor} from './interceptor/error-interceptor';
import {ClienteService} from './service/model/cliente.service';
import {AuthService} from './service/auth/auth.service';
import {StorageService} from './service/storage.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SigninModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthInterceptor,
    ErrorInterceptor,
    ClienteService,
    AuthService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
