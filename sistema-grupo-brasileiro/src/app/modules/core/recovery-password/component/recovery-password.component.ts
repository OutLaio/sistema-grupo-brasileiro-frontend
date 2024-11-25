import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRegisterService } from '../../../services/login-register/login-register.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';  // Importação do Router
import { I_Recovery_Password_Request } from '../../../shared/interfaces/auth/form/recovery-password-form';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.css'
})
export class RecoveryPasswordComponent implements OnInit {

  recoveryForm!: FormGroup;
  loading: boolean = false;  // Variável de controle para o estado de carregamento

  constructor(
    private recoveryService: LoginRegisterService,
    private toastrService: ToastrService,
    private router: Router  // Injete o Router no construtor
  ) { }

  ngOnInit(): void {
    this.recoveryForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  get email() { return this.recoveryForm.get('email')!; }

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
