import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckRequestsComponent } from './modules/feature/check-requests/components/check-requests.component';
import { CollaboratorSystemComponent } from './modules/feature/collaborator/collaborator-system/component/collaborator-system.component';
import { MainProfileComponent } from './modules/core/profile/components/main-profile/main-profile.component';
import { CreateRequestComponent } from './modules/feature/create-request/component/create-request.component';
import { RequestDetailsComponent } from './modules/feature/request-details/component/request-details.component';
import { ResetPasswordComponent } from './modules/core/reset-password/component/reset-password.component';
import { LoginComponent } from './modules/core/login/component/login.component';
import { RecoveryPasswordComponent } from './modules/core/recovery-password/component/recovery-password.component';
import { RegisterComponent } from './modules/core/register/component/register.component';
import { AuthGuard } from './modules/core/guards/guard.guard';

const routes: Routes = [
  {
    path: 'acompanhamento',
    component: CheckRequestsComponent,
    canActivate: [AuthGuard] // Corrigido: fechamento do colchete
  },
  {
    path: 'cadastro',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
  },
  {
    path: 'recuperar-senha',
    component: RecoveryPasswordComponent,
  },
  {
    path: 'colaboradores',
    component: CollaboratorSystemComponent,
    canActivate: [AuthGuard] // Corrigido: fechamento do colchete
  },
  {
    path: 'nova-solicitacao',
    component: CreateRequestComponent,
    canActivate: [AuthGuard] // Corrigido: fechamento do colchete
  },
  {
    path: 'detalhes-solicitacao',
    component: RequestDetailsComponent,
    canActivate: [AuthGuard] // Corrigido: fechamento do colchete
  },
  {
    path: 'perfil',
    component: MainProfileComponent,
    canActivate: [AuthGuard], // Corrigido: fechamento do colchete
    loadChildren: () =>
      import('./modules/core/profile/components/main-profile/profile-routing.module').then(
        (m) => m.ProfileRoutingModule
      ),
  },
  {
    path: 'meus-dados',
    redirectTo: 'perfil/meus-dados',
    pathMatch: 'full'
  },
  {
    path: 'editar',
    redirectTo: 'perfil/editar',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
