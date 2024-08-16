import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckRequestsComponent } from './modules/feature/check-requests/check-requests.component';
import { CollaboratorSystemComponent } from './modules/feature/collaborator-system/collaborator-system.component';
import { MainProfileComponent } from './modules/core/profile/main-profile/main-profile.component';
import { UserDataComponent } from './modules/core/profile/user-data/user-data.component';
import { EditUserDataComponent } from './modules/core/profile/edit-user-data/edit-user-data.component';

const routes: Routes = [
  {
    path: 'acompanhamento',
    component: CheckRequestsComponent,
  },
  {
    path: 'colaboradores',
    component: CollaboratorSystemComponent,
  },
  {
    path: 'perfil',
    component: MainProfileComponent,
    loadChildren: () =>
      import('./modules/core/profile/main-profile/profile-routing.module').then(
        (m) => m.ProfileRoutingModule
      ),
  },
  { path: 'meus-dados', redirectTo: 'perfil/meus-dados', pathMatch: 'full' },
  { path: 'editar', redirectTo: 'perfil/editar', pathMatch: 'full' },
  { path: '', redirectTo: 'acompanhamento', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
