import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/core/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecoveryPasswordComponent } from './modules/core/recovery-password/recovery-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecoveryPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
