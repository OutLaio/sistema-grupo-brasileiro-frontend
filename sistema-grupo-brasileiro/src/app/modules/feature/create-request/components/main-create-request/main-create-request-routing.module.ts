import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLuminousRequestComponent } from '../full-luminous-request/full-luminous-request.component';

const routes: Routes = [
  {
    path: 'luminoso-completo',
    component: FullLuminousRequestComponent,
  },
  {
    path: '',
    redirectTo: 'luminoso-completo',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainCreateRequestRoutingModule { }
