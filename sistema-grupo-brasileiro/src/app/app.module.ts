import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/core/login/component/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecoveryPasswordComponent } from './modules/core/recovery-password/component/recovery-password.component';
import { ResetPasswordComponent } from './modules/core/reset-password/component/reset-password.component';
import { RegisterComponent } from './modules/core/register/component/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HeaderComponent } from './modules/core/header/component/header.component';
import { SidenavComponent } from './modules/core/sidenav/component/sidenav.component';
import { CollaboratorSystemComponent } from './modules/feature/collaborator/collaborator-system/component/collaborator-system.component';
import { ListCollaboratorsComponent } from './modules/feature/collaborator/list-collaborators/component/list-collaborators.component';
import { RegisterCollaboratorComponent } from './modules/feature/collaborator/register-collaborator/component/register-collaborator.component';
import { CheckRequestsComponent } from './modules/feature/check-requests/components/check-requests.component';
import { MainProfileComponent } from './modules/core/profile/components/main-profile/main-profile.component';
import { UserDataComponent } from './modules/core/profile/components/user-data/user-data.component';
import { EditUserDataComponent } from './modules/core/profile/components/edit-user-data/edit-user-data.component';
import { RequestDetailsComponent } from './modules/feature/request-details/components/request-details/request-details.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ProfileRoutingModule } from './modules/core/profile/components/main-profile/profile-routing.module';
import { MainCreateRequestComponent } from './modules/feature/create-request/components/main-create-request/main-create-request.component';
import { MainCreateRequestRoutingModule } from './modules/feature/create-request/components/main-create-request/main-create-request-routing.module';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { ColorClassDirective } from './modules/directives/colorClass/color-class.directive';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PhoneMaskDirective } from './modules/directives/phone-mask/phone-mask.directive';
import { AgencyBoardComponent } from './modules/feature/request-details/components/agency-board/agency-board.component';
import { SignpostComponent } from './modules/feature/request-details/components/signpost/signpost.component';
import { DialogBoxComponent } from './modules/feature/request-details/components/dialog-box/dialog-box.component';
import { VersionComponent } from './modules/feature/request-details/components/version/version.component';

import { AgencyBoardRequestComponent } from './modules/feature/create-request/components/agency-board-request/agency-board-request.component';
import { LoadingFileComponent } from './modules/feature/create-request/components/loading-file/loading-file.component';
import { DndDirective } from './modules/directives/dnd/dnd.directive.directive';
import { SignpostRequestComponent } from './modules/feature/create-request/components/signpost-request/signpost-request.component';

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
    RegisterCollaboratorComponent,
    ListCollaboratorsComponent,
    CheckRequestsComponent,
    MainProfileComponent,
    UserDataComponent,
    EditUserDataComponent,
    RequestDetailsComponent,
    MainCreateRequestComponent,
    ColorClassDirective,
    PhoneMaskDirective,
    AgencyBoardComponent,
    SignpostComponent,
    DialogBoxComponent,
    VersionComponent,
    AgencyBoardRequestComponent,
    LoadingFileComponent,
    DndDirective,
    SignpostRequestComponent,
    VersionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatPaginatorModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({
    }),
    ProfileRoutingModule,
    NgScrollbarModule,
    MainCreateRequestRoutingModule

  ],
  providers: [
    provideHttpClient(withFetch()),
    provideToastr(),
    provideAnimations(),
    provideAnimationsAsync()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
