import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRegisterService } from '../../../../services/login-register/login-register.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-register-collaborator',
	templateUrl: './register-collaborator.component.html',
	styleUrl: './register-collaborator.component.css'
})
export class RegisterCollaboratorComponent {
	registerForm!: FormGroup;
	isButtonDisabled: boolean = false;

	constructor(
		private registerService: LoginRegisterService,
		private toastrService: ToastrService
	) { }

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

	get name() { return this.registerForm.get('name')!; }
	get lastname() { return this.registerForm.get('lastname')!; }
	get email() { return this.registerForm.get('email')!; }
	get password() { return this.registerForm.get('password')!; }
	get phone() { return this.registerForm.get('phone')!; }
	get sector() { return this.registerForm.get('sector')!; }
	get occupation() { return this.registerForm.get('occupation')!; }
	get nop() { return this.registerForm.get('nop')!; }

	submit() {
		if (this.registerForm.invalid) {
			this.toastrService.error("Erro ao realizar o cadastro. Verifique se os campos estão preenchidos corretamente.");
			this.isButtonDisabled = true;
			setTimeout(() => {
				this.isButtonDisabled = false;
			}, 3000);
			return;
		}

		this.registerService.registerCollaborator(
			this.name.value,
			this.lastname.value,
			this.email.value,
			this.password.value,
			this.phone.value,
			this.sector.value,
			this.occupation.value,
			this.nop.value
		).subscribe({
			next: () => {
				this.toastrService.success("Cadastro realizado com sucesso!");
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


	isFormVisible = true;

	showForm() {
		this.isFormVisible = true;
	}

	showHistory() {
		this.isFormVisible = false;
	}
}
