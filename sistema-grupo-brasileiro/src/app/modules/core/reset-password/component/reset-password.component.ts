import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { confirmPasswordValidator } from '../validators/password-validator';
import { ActivatedRoute } from '@angular/router';
import { LoginRegisterService } from '../../../services/login-register/login-register.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'; // Importa o Router
import { I_Reset_Password_Request } from '../../../shared/interfaces/auth/form/reset-password-form';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Componente responsável por redefinir a senha do usuário.
 * 
 * Apresenta um formulário para que o usuário insira e confirme a nova senha.
 * Verifica um token de redefinição enviado por meio da URL para validar e permitir a operação.
 */
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {/**
  * Formulário para redefinição de senha.
  * Contém os campos `password` e `confirmPassword` com validações.
  */
  resetForm!: FormGroup;/**
  * Token de redefinição de senha obtido dos parâmetros da URL.
  * Utilizado para validar e permitir a operação de redefinição.
  */
  token!: string;

  /**
     * Construtor do componente.
     * 
     * @param route Serviço para acessar os parâmetros da rota ativa.
     * @param loginRegisterService Serviço responsável pelas operações de autenticação e registro.
     * @param toastrService Serviço para exibir notificações de sucesso ou erro.
     * @param router Serviço para navegação entre rotas.
  */
  constructor(
    private route: ActivatedRoute,
    private loginRegisterService: LoginRegisterService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  /**
   * Método do ciclo de vida executado ao inicializar o componente.
   * 
   * - Obtém o token dos parâmetros da URL e valida sua autenticidade.
   * - Inicializa o formulário `resetForm` com os campos e validações necessários.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
    this.loginRegisterService.verifyToken(this.token).subscribe({
      next: (res) => { this.toastrService.success(res.message) },
      error: (error: HttpErrorResponse) => {
        this.toastrService.error(error.error.message);
        this.router.navigate(['/']);
      }
    })
    this.resetForm = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: confirmPasswordValidator('password', 'confirmPassword') }
    );
  }

  /**
   * Obtém o controlador do campo `password`.
   * @returns {FormControl} Controlador do campo `password`.
   */
  get password() {
    return this.resetForm.get('password')!;
  }
  /**
   * Obtém o controlador do campo `confirmPassword`.
   * @returns {FormControl} Controlador do campo `confirmPassword`.
   */
  get confirmPassword() {
    return this.resetForm.get('confirmPassword')!;
  }

  /**
   * Submete o formulário de redefinição de senha.
   * 
   * - Verifica se o formulário é válido.
   * - Prepara o objeto de requisição contendo o token e a nova senha.
   * - Chama o serviço para redefinir a senha e lida com o sucesso ou erro da operação.
  */
  submit() {
    if (this.resetForm.invalid) {
      return;
    }

    const request: I_Reset_Password_Request = {
      token: this.token,
      password: this.password.value
    }

    this.loginRegisterService
      .resetPassword(request).subscribe({
        next: (res) => {
          this.toastrService.success(res.message),
            this.resetForm.reset();
          this.router.navigate(['/login']);
        },
        error: (error: HttpErrorResponse) => {
          this.toastrService.error(error.error.message)
        }
      });
  }
}
