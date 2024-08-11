import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckRequestsComponent } from './modules/feature/check-requests/check-requests.component';
import { CollaboratorSystemComponent } from './modules/feature/collaborator-system/collaborator-system.component';
import { MainComponent } from './modules/core/profile/main/main.component';

const routes: Routes = [
  { path: 'acompanhamento', component: CheckRequestsComponent },
  { path: 'colaboradores', component: CollaboratorSystemComponent },
  { path: 'perfil', component: MainComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
