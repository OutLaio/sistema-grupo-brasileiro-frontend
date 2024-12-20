import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRegisterService } from '../../../../services/login-register/login-register.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { I_User_Request } from '../../../../shared/interfaces/user/form/user-details-form';
import Swal from 'sweetalert2';

/**
 * Componente responsável pelo registro de colaboradores.
 * Contém um formulário de registro com validação e lógica para envio de dados ao serviço de registro.
*/
@Component({
	selector: 'app-register-collaborator',
	templateUrl: './register-collaborator.component.html',
	styleUrl: './register-collaborator.component.css'
})
export class RegisterCollaboratorComponent {
	/**
	 * Formulário de registro do colaborador.
	*/
	registerForm!: FormGroup;
	/**
	 * Estado do botão de envio do formulário.
	 * Desabilita o botão durante o processamento para evitar múltiplos envios.
	*/
	isButtonDisabled: boolean = false;
	/**
	 * Controle de visibilidade entre formulário de registro e histórico.
	 */
	isFormVisible = true;

	/**
	 * Construtor que injeta os serviços necessários para o componente.
	 * @param registerService Serviço responsável pelo registro de usuários.
	 * @param toastrService Serviço para exibição de notificações.
	 */
	constructor(
		private registerService: LoginRegisterService,
		private toastrService: ToastrService
	) { }

	/**
		* Método de inicialização do componente. 
		* Inicialização do componente, criando e configurando o formulário de registro.
	*/
	ngOnInit(): void {
		this.registerForm = new FormGroup({
			name: new FormControl('', [
				Validators.required,
				Validators.pattern('^[A-Za-zÀ-ÿ]{3,}( [A-Za-zÀ-ÿ]+)*$')
			]),
			lastname: new FormControl('', [
				Validators.required,
				Validators.pattern('^(?:[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*){3,}$')
			]),
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [
				Validators.required,
				Validators.pattern(
					/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
				),
			]),
			phone: new FormControl('', [
				Validators.required,
				Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/),
			]),
			sector: new FormControl('', [Validators.required]),
			occupation: new FormControl('', [Validators.required]),
			nop: new FormControl('', [Validators.required]),
		});
	}

	/**
   * Acessores para os controles do formulário.
   */
	get name() { return this.registerForm.get('name')!; }
	get lastname() { return this.registerForm.get('lastname')!; }
	get email() { return this.registerForm.get('email')!; }
	get password() { return this.registerForm.get('password')!; }
	get phone() { return this.registerForm.get('phone')!; }
	get sector() { return this.registerForm.get('sector')!; }
	get occupation() { return this.registerForm.get('occupation')!; }
	get nop() { return this.registerForm.get('nop')!; }

	/**
   * Alterna a exibição para o formulário de registro.
   */
	showForm() {
		this.isFormVisible = true;
	}

	/**
   * Alterna a exibição para o histórico.
   */
	showHistory() {
		this.isFormVisible = false;
	}

	/**
   * Envia os dados do formulário para o serviço de registro.
   * Inclui validação e notificações para sucesso ou erro.
   */
	submit() {
		if (this.registerForm.invalid) {
			this.toastrService.error("Erro ao realizar o cadastro. Verifique se os campos estão preenchidos corretamente.");
			this.isButtonDisabled = true;
			setTimeout(() => {
				this.isButtonDisabled = false;
			}, 3000);
			return;
		}

		const data: I_User_Request = {
			employee: {
				name: this.name.value,
				lastname: this.lastname.value,
				phoneNumber: this.phone.value,
				sector: this.sector.value,
				occupation: this.occupation.value,
				agency: this.nop.value,
				avatar: 99,
			},
			user: {
				email: this.email.value,
				password: this.password.value,
				profile: 2, // 3 = Client, 2 = Collaborator, 1 = Supervisor
			},
		};

		this.registerService.registerUser(data).subscribe({
			next: (res) => {
				this.toastrService.success(res.message);
				this.isButtonDisabled = true;
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			},
			error: (value: HttpErrorResponse) => {
				this.toastrService.error(value.error.message);
			}
		});
	}
}
