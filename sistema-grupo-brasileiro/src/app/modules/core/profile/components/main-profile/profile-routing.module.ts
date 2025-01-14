import { RouterModule, Routes } from "@angular/router";
import { UserDataComponent } from "../user-data/user-data.component";
import { EditUserDataComponent } from "../edit-user-data/edit-user-data.component";
import { NgModule } from "@angular/core";

/**
 * Definição das rotas do módulo de Perfil.
 * - `meus-dados`: Rota para exibir os dados do usuário.
 * - `editar`: Rota para a edição de informações de perfil do usuário.
 * - `segurança`: Rota para exibir as configurações de segurança do perfil.
 * - `notificacoes`: Rota para exibir as preferências de notificações do usuário.
 * - `historico`: Rota para exibir o histórico de atividades do perfil.
 * - Redirecionamento padrão: Redireciona para `meus-dados` se nenhuma rota for especificada.
 */
const routes: Routes = [
  {
    path: 'meus-dados',
    component: UserDataComponent,
  },
  {
    path: 'editar',
    component: EditUserDataComponent,
  },
  {
    path: 'segurança',
    component: UserDataComponent,
  },
  {
    path: 'notificacoes',
    component: UserDataComponent,
  },
  {
    path: 'historico',
    component: UserDataComponent,
  },
  {
    path: '',
    redirectTo: 'meus-dados',
    pathMatch: 'full',
  },
];

/**
 * Módulo de roteamento para a funcionalidade de Perfil.
 * Responsável por configurar e exportar as rotas relacionadas ao perfil do usuário.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule {}
