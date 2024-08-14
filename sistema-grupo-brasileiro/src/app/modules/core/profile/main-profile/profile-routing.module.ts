import { RouterModule, Routes } from "@angular/router";
import { UserDataComponent } from "../user-data/user-data.component";
import { EditUserDataComponent } from "../edit-user-data/edit-user-data.component";
import { NgModule } from "@angular/core";


const routes: Routes = [
  {
    path: "meus-dados",
    component: UserDataComponent
  },{
    path: "editar",
    component: EditUserDataComponent
  },{
    path: "",
    redirectTo: "meus-dados",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule {}
