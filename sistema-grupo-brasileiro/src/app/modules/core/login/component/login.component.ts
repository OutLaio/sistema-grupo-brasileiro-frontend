import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRegisterService } from '../../../services/login-register/login-register.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { I_Api_Response } from '../../../shared/interfaces/api-response';
import { I_Login_Request } from '../../../shared/interfaces/auth/form/login-form';

/**
 * Componente responsável pela autenticação de usuários.
 *
 * Este componente fornece um formulário para que os usuários insiram suas credenciais
 * (e-mail e senha) e realizem o login no sistema.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {


  /**
   * Representa o formulário de login do usuário.
   * Contém os campos `email` e `password` com suas respectivas validações.
   */
  loginForm!: FormGroup;

  /**
   * Construtor do componente LoginComponent.
   * Injeta as dependências necessárias.
   *
   * @param loginService Serviço responsável por realizar chamadas de autenticação.
   * @param toastrService Serviço para exibição de notificações ao usuário.
   * @param router Serviço para navegação entre as rotas do aplicativo.
   */
  constructor(
    private loginService: LoginRegisterService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  /**
    * Método do ciclo de vida executado ao inicializar o componente.
   * 
    * Inicializa o `loginForm` com os campos e validações necessários.
    */
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }
  /**
  * Obtém o FormControl associado ao campo `email` no formulário de login.
  *
  * @returns {FormControl} O controlador do campo `email` do formulário.
  */
  get email() { return this.loginForm.get('email')!; }
  /**
  * Obtém o FormControl associado ao campo `password` no formulário de login.
  *
  * @returns {FormControl} O controlador do campo `password` do formulário.
  */
  get password() { return this.loginForm.get('password')!; }

  /**
   * Método chamado ao enviar o formulário de login.
   * Verifica se o formulário é válido.
   * Em caso de sucesso, exibe uma mensagem e redireciona o usuário para a tela principal.
   * Em caso de falha, exibe uma mensagem sobre o possível erro.
   */
  submit() {
    if (this.loginForm.invalid) { return }
    const data: I_Login_Request = {
      email: this.email.value,
      password: this.password.value
    }
    this.loginService.loginUser(data).subscribe({
      next: (res) => {
        this.toastrService.success(res.message),
          this.router.navigate(['/acompanhamento']);
      },
      error: (value: HttpErrorResponse) => {
        this.toastrService.error(value.error.message);
      }
    })
  }
}
