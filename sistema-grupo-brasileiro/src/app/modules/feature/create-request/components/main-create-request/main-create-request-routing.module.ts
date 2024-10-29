import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencyBoardRequestComponent } from '../agency-board-request/agency-board-request.component';
import { SignpostRequestComponent } from '../signpost-request/signpost-request.component';

const routes: Routes = [
  {
    path: 'placa-de-itinerarios',
    component: AgencyBoardRequestComponent,
  },
  {
    path: 'placa-de-sinalizacao',
    component: SignpostRequestComponent,
  },
  {
    path: '',
    redirectTo: 'placa-de-itinerarios',
    pathMatch: 'full',
    
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainCreateRequestRoutingModule { }
