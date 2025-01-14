import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRegisterService } from '../../../services/login-register/login-register.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';  // Importação do Router
import { I_Recovery_Password_Request } from '../../../shared/interfaces/auth/form/recovery-password-form';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Componente responsável pela recuperação de senha.
 * 
 * Este componente permite que o usuário insira seu e-mail para receber instruções de recuperação de senha.
 */
@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.css'
})
export class RecoveryPasswordComponent implements OnInit {
  /**
   * Representa o formulário de recuperação de senha.
   * Contém o campo `email` com validações de presença e formato.
  */
  recoveryForm!: FormGroup;
  /**
   * Indica o estado de carregamento enquanto a requisição está sendo processada.
   * @type {boolean}
   */
  loading: boolean = false;  // Variável de controle para o estado de carregamento

  /**
   * Construtor do componente.
   * 
   * @param recoveryService Serviço responsável por realizar a solicitação de recuperação de senha.
   * @param toastrService Serviço para exibir mensagens de sucesso ou erro.
   * @param router Serviço para navegação entre rotas.
   */
  constructor(
    private recoveryService: LoginRegisterService,
    private toastrService: ToastrService,
    private router: Router  // Injete o Router no construtor
  ) { }

  /**
   * Método do ciclo de vida executado ao inicializar o componente.
   * 
   * Inicializa o formulário de recuperação de senha com validações.
  */
  ngOnInit(): void {
    this.recoveryForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  /**
   * Getter para acessar o controle do campo `email` do formulário.
   * @returns {FormControl} Controlador do campo `email`.
   */
  get email() { return this.recoveryForm.get('email')!; }

  /**
   * Envia o formulário de recuperação de senha.
   * 
   * - Valida se o formulário está correto.
   * - Exibe um estado de carregamento enquanto processa a requisição.
   * - Envia o e-mail para recuperação de senha através do serviço.
   * - Lida com sucesso ou erro na requisição.
   */
  submit(): void {
    if (this.recoveryForm.invalid) { return; }

    this.loading = true;

    const request: I_Recovery_Password_Request = {
      email: this.email.value
    }

    this.recoveryService.recoveryPassword(request).subscribe({
      next: (res) => {
        this.toastrService.success(res.message);
        this.recoveryForm.reset();
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (res: HttpErrorResponse) => {
        this.toastrService.error(res.error.message);
        this.loading = false;
      }
    });
  }
}
