import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../../../services/login-register/login-register.service';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';
import Swal from 'sweetalert2';
import { ProfileService } from '../../services/profile/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { I_Change_Password_Request } from '../../../../shared/interfaces/auth/form/password-form';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDataComponent } from '../edit-user-data/edit-user-data.component';
import { StorageService } from '../../../../services/storage/storage.service';


/**
 * Componente responsável por gerenciar os dados de perfil do usuário.
 * 
 * Este componente permite:
 * - Visualizar dados do perfil do usuário ativo.
 * - Editar o perfil do usuário.
 * - Alterar a senha do usuário.
 * - Excluir a conta do usuário.
 */
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent implements OnInit {
  /**
   * Dados do usuário ativo obtidos a partir da sessão.
   * @type {I_Employee_View_Data | null}
   */
  activeUser!: I_Employee_View_Data | null;
  /**
   * Representa o nível do usuário logado.
   * @type {string}
  */
  userRole: string = "";

  /**
   * Mapeamento de roles do sistema para representações legíveis.
   * @type {Record<string, string>}
   */
  private roleMapping: { [key: string]: string } = {
    'ROLE_CLIENT': 'Cliente',
    'ROLE_COLLABORATOR': 'Colaborador',
    'ROLE_SUPERVISOR': 'Supervisor',
  };

  /**
   * Construtor do componente.
   * 
   * @param {ProfileService} profileService Serviço para gerenciar o perfil do usuário.
   * @param {LoginRegisterService} loginRegisterService Serviço para operações de login e logout.
   * @param {StorageService} storageService Serviço para acessar os dados armazenados localmente.
   * @param {Router} router Serviço de navegação e rotas.
   * @param {MatDialog} dialog Serviço para abrir diálogos e modais.
   */
  constructor(
    private profileService: ProfileService,
    private loginRegisterService: LoginRegisterService,
    private storageService: StorageService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  /**
   * Método do ciclo de vida executado ao inicializar o componente.
   * 
   * Obtém os dados do perfil do usuário ativo e a role mapeada.
   */
  ngOnInit(): void {
    this.activeUser = this.storageService.getSessionProfile();
    const role = this.storageService.getUserRole() ?? "";
    this.userRole = this.roleMapping[role] || '';
  }

  /**
   * Abre o modal para editar o perfil do usuário.
   */
  editProfile(): void {
    const dialogRef = this.dialog.open(EditUserDataComponent, {
      width: '1200px',
      height: 'auto',
      data: {
        activeUser: this.activeUser
      }
    });
  }

  /**
   * Deleta a conta do usuário após uma confirmação.
   * Exibe uma caixa de diálogo de confirmação para garantir que o usuário deseja realmente excluir sua conta.
   * Caso confirmado, realiza a chamada ao serviço para excluir a conta e, em seguida, realiza o logout do usuário.
   */
  deleteAccount() {
    Swal.fire({
      title: 'Deletar Conta',
      text: 'Tem certeza de que deseja deletar sua conta? Essa ação não pode ser desfeita.',
      icon: 'warning',
      showDenyButton: true,
      denyButtonColor: '#f15649',
      confirmButtonColor: '#029982',
      confirmButtonText: 'Sim, deletar',
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.profileService
          .deleteAccount(this.activeUser?.id).subscribe({
            next: (value) => {
              Swal.fire({
                title: value.message,
                text: 'Sua conta foi deletada com sucesso.',
                icon: 'success',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
              });
              setTimeout(() => {
                this.loginRegisterService.logout();
              }, 3000);
            },
            error: (err: { message: HttpErrorResponse; }) => {
              Swal.fire('Erro', `Houve um problema ao deletar sua conta: ${err.message}`, 'error');
            }
          });
      }
    });
  }

  /**
   * Abre o modal para alterar a senha do usuário.
   * A nova senha deve atender a certos critérios de segurança (como comprimento mínimo, presença de letras maiúsculas e minúsculas, números e caracteres especiais).
   */
  editPassword(): void {
    Swal.fire({
      title: 'Alterar Senha',
      html:
        `<div id="passwordCriteria" style="text-align: left;">` +
        `<p id="lengthCriteria" class="text-muted" style="font-size: 18;">- Mínimo de 8 caracteres</p>` +
        `<p id="uppercaseCriteria" class="text-muted" style="font-size: 18;">- Pelo menos uma letra maiúscula</p>` +
        `<p id="lowercaseCriteria" class="text-muted" style="font-size: 18;">- Pelo menos uma letra minúscula</p>` +
        `<p id="numberCriteria" class="text-muted" style="font-size: 18;">- Pelo menos um número</p>` +
        `<p id="specialCharCriteria" class="text-muted" style="font-size: 18;">- Pelo menos um caractere especial ($*&@#)</p>` +
        `</div>` +
        `<input type="password" id="currentPassword" class="swal2-input" placeholder="Senha Atual">` +
        `<input type="password" id="newPassword" class="swal2-input" placeholder="Nova Senha">` +
        `<input type="password" id="confirmPassword" class="swal2-input" placeholder="Repetir Nova Senha">`,
      focusConfirm: false,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#029982',
      denyButtonColor: '#f15649',
      denyButtonText: 'Cancelar',
      showDenyButton: true,
      didOpen: () => {
        const newPasswordInput = document.getElementById('newPassword') as HTMLInputElement;
        newPasswordInput.addEventListener('input', validatePassword);
      },
      preConfirm: () => {
        const currentPassword = (Swal.getPopup()?.querySelector('#currentPassword') as HTMLInputElement)?.value;
        const newPassword = (Swal.getPopup()?.querySelector('#newPassword') as HTMLInputElement)?.value;
        const confirmPassword = (Swal.getPopup()?.querySelector('#confirmPassword') as HTMLInputElement)?.value;

        const allCriteriaMet = validatePassword();

        if (!currentPassword || !newPassword || !confirmPassword) {
          Swal.showValidationMessage(`Por favor, preencha todos os campos`);
          return;
        }

        if (!allCriteriaMet) {
          Swal.showValidationMessage(`A senha não atende aos requisitos de segurança`);
          return;
        }

        if (newPassword !== confirmPassword) {
          Swal.showValidationMessage(`Senhas não coincidem`);
          return;
        }

        return { currentPassword, newPassword };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const userPasswordRequest: I_Change_Password_Request = {
          idUser: this.activeUser?.id!,
          currentPassword: result.value!.currentPassword,
          newPassword: result.value!.newPassword,
        };

        this.profileService.editPassword(userPasswordRequest)
          .subscribe({
            next: (value) => {
              Swal.fire('Sucesso', value.message, 'success')
            },
            error: (err: { message: HttpErrorResponse; }) => {
              Swal.fire('Erro', `Erro ao alterar a senha: ${err.message}`, 'error');
            }
          });
      }
    });

    const validatePassword = (): boolean => {
      const newPasswordInput = document.getElementById('newPassword') as HTMLInputElement;
      const lengthCriteria = document.getElementById('lengthCriteria') as HTMLElement;
      const uppercaseCriteria = document.getElementById('uppercaseCriteria') as HTMLElement;
      const lowercaseCriteria = document.getElementById('lowercaseCriteria') as HTMLElement;
      const numberCriteria = document.getElementById('numberCriteria') as HTMLElement;
      const specialCharCriteria = document.getElementById('specialCharCriteria') as HTMLElement;

      const password = newPasswordInput.value;

      const criteria = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        specialChar: /[$*&@#]/.test(password)
      };

      lengthCriteria.style.color = criteria.length ? 'green' : 'red';
      lengthCriteria.innerHTML = `${criteria.length ? '✅️' : '-'} Mínimo de 8 caracteres`;

      uppercaseCriteria.style.color = criteria.uppercase ? 'green' : 'red';
      uppercaseCriteria.innerHTML = `${criteria.uppercase ? '✅️' : '-'} Pelo menos uma letra maiúscula`;

      lowercaseCriteria.style.color = criteria.lowercase ? 'green' : 'red';
      lowercaseCriteria.innerHTML = `${criteria.lowercase ? '✅️' : '-'} Pelo menos uma letra minúscula`;

      numberCriteria.style.color = criteria.number ? 'green' : 'red';
      numberCriteria.innerHTML = `${criteria.number ? '✅️' : '-'} Pelo menos um número`;

      specialCharCriteria.style.color = criteria.specialChar ? 'green' : 'red';
      specialCharCriteria.innerHTML = `${criteria.specialChar ? '✅️' : '-'} Pelo menos um caractere especial ($*&@#)`;

      return Object.values(criteria).every(Boolean);
    };
  }



}
