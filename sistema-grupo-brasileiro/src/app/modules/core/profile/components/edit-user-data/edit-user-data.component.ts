import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';
import { I_Employee_Form_Data } from '../../../../shared/interfaces/user/form/employee-form';
import { ProfileService } from '../../services/profile/profile.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StorageService } from '../../../../services/storage/storage.service';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Componente para edição de dados do usuário.
 * 
 * Este componente fornece um formulário para que os usuários possam editar informações do perfil, como nome, telefone,
 * setor, ocupação e agência. Também permite a seleção e atualização do avatar do usuário.
 */
@Component({
  selector: 'app-edit-user-data',
  templateUrl: './edit-user-data.component.html',
  styleUrl: './edit-user-data.component.css',
})
export class EditUserDataComponent {
  /**
 * Representa o formulário de edição do perfil do usuário.
 * Contém os campos `name`, `lastname`, `phone`, `sector`, `occupation` e `nop` com suas respectivas validações.
 */
  editForm!: FormGroup;
  /**
   * Armazena os dados do usuário ativo exibidos no formulário.
  */
  activeUser!: I_Employee_View_Data | null;
  /**
   * Armazena os dados editáveis do usuário, utilizados para atualização no backend.
  */
  activeUserEdit!: I_Employee_Form_Data | null;
  /**
    * Controle para exibição do modal de seleção de avatar.
  */
  isAvatarModalOpen = false;
  /**
   * Armazena o índice do avatar selecionado pelo usuário.
   */
  selectedAvatar!: number | undefined;
  /**
   * Lista de avatares disponíveis para seleção.
  */
  avatars = Array(20).fill(null);

  /**
   * Construtor do componente `EditUserDataComponent`.
   * Injeta as dependências necessárias.
   *
   * @param profileService Serviço responsável pela interação com o backend para gerenciamento de perfil.
   * @param toastrService Serviço para exibição de notificações ao usuário.
   * @param router Serviço para navegação entre as rotas do aplicativo.
   * @param storageService Serviço para manipulação dos dados de sessão.
   * @param dialogRef Referência ao modal atual, usada para gerenciar sua abertura e fechamento.
   * @param data Dados recebidos ao abrir o modal, contendo informações do usuário ativo.
   */
  constructor(
    private profileService: ProfileService,
    private toastrService: ToastrService,
    private router: Router,
    private storageService: StorageService,
    public dialogRef: MatDialogRef<EditUserDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.activeUser) {
      this.activeUser = data.activeUser;
    }
  }

  /**
   * Método do ciclo de vida executado ao inicializar o componente.
   * Configura os dados do formulário e carrega as informações do usuário ativo.
   */
  ngOnInit(): void {
    this.selectedAvatar = this.activeUser?.avatar;
    this.activeUser = this.storageService.getSessionProfile();
    if (this.activeUser) {
      this.activeUserEdit = {
        name: this.activeUser.name || '',
        lastname: this.activeUser.lastname || '',
        phoneNumber: this.activeUser.phoneNumber || '',
        sector: this.activeUser.sector || '',
        occupation: this.activeUser.occupation || '',
        agency: this.activeUser.agency || '',
        avatar: this.activeUser.avatar,
      };
    }

    this.editForm = new FormGroup({
      name: new FormControl(this.activeUser?.name, [Validators.required]),
      lastname: new FormControl(this.activeUser?.lastname, [Validators.required]),
      phone: new FormControl(this.activeUser?.phoneNumber, [
        Validators.required,
        Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/),
      ]),
      email: new FormControl(this.activeUser?.user.email, [Validators.required, Validators.email]),
      sector: new FormControl(this.activeUser?.sector, [Validators.required]),
      occupation: new FormControl(this.activeUser?.occupation, [Validators.required]),
      nop: new FormControl(this.activeUser?.agency, [Validators.required]),
    });
  }

  /**
    * Métodos de acesso aos campos do formulário para facilitar sua manipulação.
  */
  get name() { return this.editForm.get('name')!; }
  get lastname() { return this.editForm.get('lastname')!; }
  get phone() { return this.editForm.get('phone')!; }
  get sector() { return this.editForm.get('sector')!; }
  get occupation() { return this.editForm.get('occupation')!; }
  get nop() { return this.editForm.get('nop')!; }

  /**
  * Abre o modal para seleção de avatar.
  */
  openAvatarModal() {
    this.isAvatarModalOpen = true;
  }

  /**
   * Fecha o modal de seleção de avatar sem salvar alterações.
   */
  closeAvatarModal() {
    this.isAvatarModalOpen = false;
  }

  /**
   * Cancela a seleção de avatar, restaurando a opção anterior.
   */
  cancelAvatarModal() {
    this.isAvatarModalOpen = false;
    this.selectedAvatar = this.activeUser?.avatar;
  }

  /**
   * Atualiza o avatar selecionado com base no índice fornecido.
   *
   * @param index Índice do avatar a ser selecionado.
   */
  selectAvatar(index: number) {
    this.selectedAvatar = index + 1;
  }

  /**
   * Salva as alterações realizadas no formulário e fecha o modal.
   * Atualiza os dados do usuário ativo no backend.
   */
  saveAvatar() {
    if (this.selectedAvatar !== null) {
      this.activeUserEdit!.avatar = this.selectedAvatar!;
      this.closeAvatarModal();
    } else {
      this.toastrService.error('Por favor, selecione um avatar!');
    }
  }

  /**
   * Cancela a edição de perfil e fecha o modal sem salvar alterações.
   */
  cancel() {
    this.dialogRef.close(this.activeUser);
  }

  /**
   * Submete o formulário de edição de perfil.
   * Atualiza os dados no backend e na sessão local. Em caso de sucesso, recarrega a página e fecha o modal.
   * Caso ocorra um erro, exibe uma mensagem de erro para o usuário.
   */
  submit() {
    if (this.editForm.invalid) {
      this.toastrService.error("Preencha todos os campos!");
      return;
    }

    this.activeUserEdit!.name = this.name.value;
    this.activeUserEdit!.lastname = this.lastname.value;
    this.activeUserEdit!.phoneNumber = this.phone.value;
    this.activeUserEdit!.sector = this.sector.value;
    this.activeUserEdit!.occupation = this.occupation.value;
    this.activeUserEdit!.agency = this.nop.value;

    this.profileService.updateProfileUser(this.activeUserEdit!, this.activeUser?.id).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.storageService.setSessionProfile(response.data!);
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.dialogRef.close(this.activeUser);
      },
      (err: HttpErrorResponse) => {
        this.toastrService.error(err.error.message);
      }
    );
  }
}
