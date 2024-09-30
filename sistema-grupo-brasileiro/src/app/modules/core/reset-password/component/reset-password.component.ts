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

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  token!: string;

  constructor(
    private route: ActivatedRoute,
    private loginRegisterService: LoginRegisterService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
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

  get password() {
    return this.resetForm.get('password')!;
  }
  get confirmPassword() {
    return this.resetForm.get('confirmPassword')!;
  }

  submit() {
    if (this.resetForm.invalid) {
      return;
    }

    this.loginRegisterService
      .resetPassword(this.password.value, this.token).subscribe({
        next: () => {
          this.toastrService.success("Senha alterada com sucesso!"),
          this.resetForm.reset();
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.toastrService.error(error.error.message)
        }
      });
  }
}
