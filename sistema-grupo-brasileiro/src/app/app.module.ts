import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/core/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecoveryPasswordComponent } from './modules/core/recovery-password/recovery-password.component';
import { ResetPasswordComponent } from './modules/core/reset-password/reset-password.component';
import { RegisterComponent } from './modules/core/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HeaderComponent } from './modules/layout/header/header.component';
import { SidenavComponent } from './modules/layout/sidenav/sidenav.component';
import { CollaboratorSystemComponent } from './modules/feature/collaborator-system/collaborator-system.component';
import { ListCollaboratorsComponent } from './modules/feature/list-collaborators/list-collaborators.component';
import { CreateCollaboratorComponent } from './modules/feature/create-collaborator/create-collaborator.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecoveryPasswordComponent,
    ResetPasswordComponent,
    RegisterComponent,
    HeaderComponent,
    SidenavComponent,
    CollaboratorSystemComponent,
    ListCollaboratorsComponent,
    CreateCollaboratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideToastr(),
    provideAnimations()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
