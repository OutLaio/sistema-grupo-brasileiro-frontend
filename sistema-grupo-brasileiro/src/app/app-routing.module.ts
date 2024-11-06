import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckRequestsComponent } from './modules/feature/check-requests/components/check-requests.component';
import { CollaboratorSystemComponent } from './modules/feature/collaborator/collaborator-system/component/collaborator-system.component';
import { MainProfileComponent } from './modules/core/profile/components/main-profile/main-profile.component';
import { MainCreateRequestComponent } from './modules/feature/create-request/components/main-create-request/main-create-request.component';
import { RequestDetailsComponent } from './modules/feature/request-details/components/request-details/request-details.component';
import { ResetPasswordComponent } from './modules/core/reset-password/component/reset-password.component';
import { LoginComponent } from './modules/core/login/component/login.component';
import { RecoveryPasswordComponent } from './modules/core/recovery-password/component/recovery-password.component';
import { RegisterComponent } from './modules/core/register/component/register.component';
import { AuthGuard } from './modules/core/guards/guard.guard';

const routes: Routes = [
  {
    path: 'acompanhamento',
    component: CheckRequestsComponent,
    canActivate: [AuthGuard]
  },
  {

    path: 'cadastro',
    title: 'Cadastro',
    component: RegisterComponent,
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: 'redefinir-senha',
    title: 'Redefinir Senha',
    component: ResetPasswordComponent,
  },
  {
    path: 'recuperar-senha',
    title: 'Recuperar Senha',
    component: RecoveryPasswordComponent,
  },
  {
    path: 'colaboradores',
    component: CollaboratorSystemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detalhes-solicitacao',
    title: 'Detalhes da Solicitação',
    component: RequestDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    title: 'Perfil',
    component: MainProfileComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import(
        './modules/core/profile/components/main-profile/profile-routing.module'
      ).then((m) => m.ProfileRoutingModule),
  },
  {
    path: 'meus-dados',
    title: 'Meus dados',
    redirectTo: 'perfil/meus-dados',
    pathMatch: 'full',
  },
  {
    path: 'editar',
    title: 'Editar Dados',
    redirectTo: 'perfil/editar',
    pathMatch: 'full',
  },
  {
    path: 'nova-solicitacao',
    title: 'Nova Solicitação',
    component: MainCreateRequestComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/feature/create-request/components/main-create-request/main-create-request-routing.module').then(
        (m) => m.MainCreateRequestRoutingModule
      ),
  },
  {
    path: 'placa-de-itinerarios',
    redirectTo: 'nova-solicitacao/placa-de-itinerarios',
    pathMatch: 'full'
  },
  {
    path: 'placa-de-sinalizacao',
    redirectTo: 'nova-solicitacao/placa-de-sinalizacao',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/acompanhamento',
    pathMatch: 'full',

  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
