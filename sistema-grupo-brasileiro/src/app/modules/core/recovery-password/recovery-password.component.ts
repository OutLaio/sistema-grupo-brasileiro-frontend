import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRegisterService } from '../../services/login-register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.css'
})
export class RecoveryPasswordComponent implements OnInit {

  recoveryForm!: FormGroup;

  constructor(
    private recoveryService: LoginRegisterService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.recoveryForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  get email(){return this.recoveryForm.get('email')!;}

  submit(): void {
    if (this.recoveryForm.invalid){return}

    this.recoveryService.recoveryPassword(this.email.value).subscribe({
      next: () => {
        this.toastrService.success('Sua solicitação de recuperação de senha foi enviada com sucesso! Verifique seu e-mail.');
        this.recoveryForm.reset();
      },
      error: (error) => {
        this.toastrService.error('Houve um erro ao tentar recuperar a senha. Tente novamente.');
      }
    })
  }
}
