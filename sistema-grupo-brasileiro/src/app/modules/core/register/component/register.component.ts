import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRegisterService } from '../../../services/login-register/login-register.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { I_User_Request } from '../../../shared/interfaces/user/form/user-details-form';

/**
 * Componente responsável pelo registro de novos usuários no sistema.
 * 
 * Este componente apresenta um formulário com validações para capturar os dados do usuário,
 * como nome, sobrenome, email, senha, telefone, setor, função e NOP/Agência.
 * Também valida um token de registro antes de permitir o cadastro.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  /**
   * Representa o formulário de registro do usuário.
   * Contém campos validados como `name`, `lastname`, `email`, `password`, `phone`, `sector`, `occupation`, e `nop`.
   */
  registerForm!: FormGroup;
  /**
   * Indica se o botão de envio está desativado.
   * Utilizado para prevenir múltiplos envios do formulário.
   */
  isButtonDisabled: boolean = false;
  /**
   * Token de registro extraído dos parâmetros da URL, verificado antes de permitir o registro.
   */
  token!: string;

  /**
   * Construtor do componente.
   * 
   * @param route Serviço de rota ativa para acessar os parâmetros da URL.
   * @param registerService Serviço responsável pelas operações de registro do usuário.
   * @param toastrService Serviço para exibir notificações de sucesso ou erro para o usuário.
   * @param router Serviço para navegação entre rotas.
   */
  constructor(
    private route: ActivatedRoute,
    private registerService: LoginRegisterService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  /**
   * Método do ciclo de vida executado ao inicializar o componente.
   * 
   * - Extrai o token de registro dos parâmetros da URL.
   * - Verifica a validade do token de registro.
   * - Inicializa o formulário de registro com os campos e suas validações.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
    this.registerService.verifyToken(this.token).subscribe({
      next: (res) => { this.toastrService.success(res.message) },
      error: (error: HttpErrorResponse) => {
        this.toastrService.error(error.error.message);
        this.router.navigate(['/']);
      }
    })
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-zÀ-ÿ]{3,}( [A-Za-zÀ-ÿ]+)*$'),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?:[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*){3,}$'),
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
   * Obtém o controlador do campo `name`.
   * @returns {FormControl} Controlador do campo `name`.
   */
  get name() {
    return this.registerForm.get('name')!;
  }
  /**
   * Obtém o controlador do campo `lastname`.
   * @returns {FormControl} Controlador do campo `lastname`.
   */
  get lastname() {
    return this.registerForm.get('lastname')!;
  }
  /**
   * Obtém o controlador do campo `email`.
   * @returns {FormControl} Controlador do campo `email`.
   */
  get email() {
    return this.registerForm.get('email')!;
  }
  /**
   * Obtém o controlador do campo `password`.
   * @returns {FormControl} Controlador do campo `password`.
   */
  get password() {
    return this.registerForm.get('password')!;
  }
  /**
   * Obtém o controlador do campo `phone`.
   * @returns {FormControl} Controlador do campo `phone`.
   */
  get phone() {
    return this.registerForm.get('phone')!;
  }
  /**
   * Obtém o controlador do campo `sector`.
   * @returns {FormControl} Controlador do campo `sector`.
   */
  get sector() {
    return this.registerForm.get('sector')!;
  }
  /**
   * Obtém o controlador do campo `occupation`.
   * @returns {FormControl} Controlador do campo `occupation`.
   */
  get occupation() {
    return this.registerForm.get('occupation')!;
  }
  /**
   * Obtém o controlador do campo `nop`.
   * @returns {FormControl} Controlador do campo `nop`.
   */
  get nop() {
    return this.registerForm.get('nop')!;
  }

  /**
 * Envia os dados do formulário de registro.
 * 
 * - Verifica se o formulário é válido.
 * - Prepara o objeto `I_User_Request` com os dados do usuário e do funcionário.
 * - Chama o serviço de registro e lida com o sucesso ou erro da operação.
 */
  submit() {
    if (this.registerForm.invalid) {
      this.toastrService.error(
        'Erro ao realizar o cadastro. Verifique se os campos estão preenchidos corretamente.'
      );
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
        profile: 3, // 3 = Client, 2 = Collaborator, 1 = Supervisor
      },
    };

    this.registerService.registerUser(data).subscribe({
      next: () => {
        this.toastrService.success('Cadastro realizado com sucesso!');
        this.isButtonDisabled = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (value: HttpErrorResponse) => {
        this.toastrService.error(value.error.message);
      },
    });
  }
}
